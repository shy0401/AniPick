const { stripHtmlTags } = require('../utils/animeI18n');
const {
  getOpenAIClient,
  selectTranslationModel,
  markModelUnavailable,
} = require('./openai-model.service');

const FAILED_TRANSLATION_TTL_MS = 30 * 60 * 1000;
const failedTranslationCache = new Map();

function getFailureKey({ provider, externalId, targetLang }) {
  const p = String(provider || 'JIKAN').toUpperCase();
  const id = Number(externalId || 0);
  const lang = String(targetLang || '').toLowerCase();
  return `${p}:${id}:${lang}`;
}

function getRecentFailure(key) {
  const entry = failedTranslationCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    failedTranslationCache.delete(key);
    return null;
  }
  return entry;
}

function markFailure(key, reason) {
  failedTranslationCache.set(key, {
    reason,
    expiresAt: Date.now() + FAILED_TRANSLATION_TTL_MS,
  });
}

function clearFailure(key) {
  failedTranslationCache.delete(key);
}

function safeText(text, limit = 3000) {
  const cleaned = stripHtmlTags(text || '');
  if (!cleaned) return '';
  return cleaned.slice(0, limit);
}

function targetLanguageName(targetLang) {
  if (targetLang === 'ko') return 'Korean';
  if (targetLang === 'ja') return 'Japanese';
  return 'English';
}

function buildTranslationPrompt({ title, description, targetLang }) {
  const language = targetLanguageName(targetLang);

  return [
    `Target language: ${language}`,
    'Rules:',
    '- Keep original meaning, do not invent facts.',
    '- Keep proper nouns recognizable.',
    '- Remove source labels such as MAL Rewrite.',
    '- Output concise natural text.',
    '- Description should be 3 to 6 sentences when source is long.',
    '- Do not add spoilers that are not in the source text.',
    '',
    `Title: ${title || ''}`,
    `Description: ${description || ''}`,
  ].join('\n');
}

function extractOutputText(response) {
  if (response?.output_text) return response.output_text;

  const output = response?.output || [];
  for (const item of output) {
    const content = item?.content || [];
    for (const part of content) {
      if (part?.type === 'output_text' && part?.text) return part.text;
      if (part?.type === 'text' && part?.text) return part.text;
    }
  }

  return '';
}

function classifyOpenAIError(error) {
  const status = Number(error?.status || error?.response?.status || 0);
  const message = String(error?.message || '').toLowerCase();
  const code = String(error?.code || '').toLowerCase();

  if (
    status === 403 ||
    message.includes('does not have access to model') ||
    message.includes('model access denied')
  ) {
    return 'model_access_denied';
  }

  if (
    status === 400 &&
    (message.includes('does not exist') ||
      message.includes('model_not_found') ||
      code.includes('model_not_found'))
  ) {
    return 'invalid_request';
  }

  if (status === 429 || message.includes('rate limit')) {
    return 'rate_limited';
  }

  if (
    code.includes('enotfound') ||
    code.includes('econnreset') ||
    code.includes('etimedout') ||
    code.includes('econnaborted')
  ) {
    return 'network_error';
  }

  if (status >= 400 && status < 500) return 'invalid_request';
  if (status >= 500) return 'network_error';
  return 'unknown';
}

function isModelSwitchError(reason) {
  return reason === 'model_access_denied' || reason === 'invalid_request';
}

async function callTranslation(client, model, prompt) {
  return client.responses.create({
    model,
    input: [
      {
        role: 'system',
        content: 'You are a professional anime metadata translator. Return only valid JSON.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'anime_translation',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
          },
          required: ['title', 'description'],
        },
      },
    },
  });
}

async function translateAnimeText({
  provider,
  externalId,
  title,
  description,
  targetLang,
}) {
  const failureKey = getFailureKey({ provider, externalId, targetLang });
  const recentFailure = getRecentFailure(failureKey);
  if (recentFailure) {
    console.log(
      `[TRANSLATION] skipped recent failed translation ${failureKey} reason=${recentFailure.reason}`
    );
    return {
      ok: false,
      reason: recentFailure.reason,
    };
  }

  const client = getOpenAIClient();
  if (!client) {
    return {
      ok: false,
      reason: 'no_accessible_model',
    };
  }

  const cleanedTitle = safeText(title, 300);
  const cleanedDescription = safeText(description, 3000);
  if (!cleanedDescription) {
    return {
      ok: false,
      reason: 'invalid_request',
    };
  }

  const prompt = buildTranslationPrompt({
    title: cleanedTitle,
    description: cleanedDescription,
    targetLang,
  });

  const triedModels = new Set();
  let selectedModel = await selectTranslationModel(client);

  if (!selectedModel) {
    markFailure(failureKey, 'no_accessible_model');
    return {
      ok: false,
      reason: 'no_accessible_model',
    };
  }

  while (selectedModel && !triedModels.has(selectedModel)) {
    triedModels.add(selectedModel);

    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await callTranslation(client, selectedModel, prompt);
      const outputText = extractOutputText(response);

      if (!outputText) {
        markFailure(failureKey, 'invalid_request');
        return { ok: false, reason: 'invalid_request' };
      }

      try {
        const parsed = JSON.parse(outputText);
        clearFailure(failureKey);
        return {
          ok: true,
          model: selectedModel,
          title: stripHtmlTags(parsed?.title || cleanedTitle),
          description: stripHtmlTags(parsed?.description || ''),
        };
      } catch (parseError) {
        console.error('[TRANSLATION] response parse failed:', parseError.message);
        markFailure(failureKey, 'invalid_request');
        return { ok: false, reason: 'invalid_request' };
      }
    } catch (error) {
      const reason = classifyOpenAIError(error);
      console.error('[TRANSLATION] OpenAI request failed:', error.message);

      if (isModelSwitchError(reason)) {
        markModelUnavailable(selectedModel);
        // eslint-disable-next-line no-await-in-loop
        selectedModel = await selectTranslationModel(client, { forceRefresh: true });
        if (!selectedModel || triedModels.has(selectedModel)) {
          markFailure(failureKey, 'no_accessible_model');
          return { ok: false, reason: 'no_accessible_model' };
        }
        continue;
      }

      markFailure(failureKey, reason);
      return {
        ok: false,
        reason,
      };
    }
  }

  markFailure(failureKey, 'no_accessible_model');
  return {
    ok: false,
    reason: 'no_accessible_model',
  };
}

async function translateAnimeTitle({ provider, externalId, title, targetLang }) {
  const result = await translateAnimeText({
    provider,
    externalId,
    title,
    description: 'Translate only title naturally.',
    targetLang,
  });

  return result?.ok ? result.title : null;
}

async function translateAnimeDescription({ provider, externalId, title, description, targetLang }) {
  const result = await translateAnimeText({ provider, externalId, title, description, targetLang });
  return result?.ok ? result.description : null;
}

module.exports = {
  translateAnimeText,
  translateAnimeTitle,
  translateAnimeDescription,
  buildTranslationPrompt,
};
