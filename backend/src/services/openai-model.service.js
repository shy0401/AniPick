const DEFAULT_CANDIDATES = [
  'gpt-4o-mini',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-5-mini',
  'gpt-5-nano',
  'gpt-5.4-mini',
  'gpt-5.4-nano',
  'gpt-5.5',
];

let cachedModel = null;
let cachedAccessibleModels = null;
let cachedAt = 0;
const MODEL_CACHE_TTL_MS = 10 * 60 * 1000;
const unavailableModels = new Set();

function uniqueCompact(values = []) {
  const seen = new Set();
  const result = [];
  values.forEach((value) => {
    const item = String(value || '').trim();
    if (!item || seen.has(item)) return;
    seen.add(item);
    result.push(item);
  });
  return result;
}

function getCandidateModels() {
  const explicit = String(process.env.OPENAI_TRANSLATION_MODEL || '').trim();
  const fromEnv = String(process.env.OPENAI_TRANSLATION_MODEL_CANDIDATES || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  return uniqueCompact([
    ...(explicit ? [explicit] : []),
    ...fromEnv,
    ...DEFAULT_CANDIDATES,
  ]);
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  try {
    // eslint-disable-next-line global-require
    const OpenAI = require('openai');
    return new OpenAI({ apiKey });
  } catch {
    console.warn('[TRANSLATION] openai package is missing.');
    return null;
  }
}

async function listAccessibleModels(client) {
  if (!client) return null;

  try {
    const response = await client.models.list();
    const list = Array.isArray(response?.data) ? response.data : [];
    return list.map((item) => item?.id).filter(Boolean);
  } catch (error) {
    console.warn('[TRANSLATION] Failed to list models:', error.message);
    return null;
  }
}

function pickFromCandidates(candidates, accessibleModels) {
  if (!Array.isArray(accessibleModels)) return null;

  for (const model of candidates) {
    if (unavailableModels.has(model)) continue;
    if (accessibleModels.includes(model)) return model;
  }

  return null;
}

async function selectTranslationModel(client, options = {}) {
  const { forceRefresh = false } = options;
  const now = Date.now();

  if (!forceRefresh && cachedModel && !unavailableModels.has(cachedModel)) {
    return cachedModel;
  }

  const candidates = getCandidateModels();
  let accessibleModels = cachedAccessibleModels;

  const needsRefresh =
    forceRefresh ||
    !Array.isArray(cachedAccessibleModels) ||
    now - cachedAt > MODEL_CACHE_TTL_MS;

  if (needsRefresh) {
    accessibleModels = await listAccessibleModels(client);
    if (Array.isArray(accessibleModels)) {
      cachedAccessibleModels = accessibleModels;
      cachedAt = now;
    }
  }

  const selected = pickFromCandidates(candidates, accessibleModels);
  if (selected) {
    if (cachedModel !== selected) {
      console.log(`[TRANSLATION] Selected OpenAI model: ${selected}`);
    }
    cachedModel = selected;
    return selected;
  }

  if (!Array.isArray(accessibleModels)) {
    const fallback = candidates.find((model) => !unavailableModels.has(model)) || null;
    if (fallback) {
      if (cachedModel !== fallback) {
        console.log(`[TRANSLATION] Selected OpenAI model (fallback): ${fallback}`);
      }
      cachedModel = fallback;
      return fallback;
    }
  }

  cachedModel = null;
  return null;
}

function markModelUnavailable(model) {
  const name = String(model || '').trim();
  if (!name) return;
  unavailableModels.add(name);
  if (cachedModel === name) cachedModel = null;
}

function getUnavailableModels() {
  return Array.from(unavailableModels);
}

function resetModelCache() {
  cachedModel = null;
  cachedAccessibleModels = null;
  cachedAt = 0;
  unavailableModels.clear();
}

module.exports = {
  DEFAULT_CANDIDATES,
  getCandidateModels,
  getOpenAIClient,
  listAccessibleModels,
  selectTranslationModel,
  markModelUnavailable,
  getUnavailableModels,
  resetModelCache,
};
