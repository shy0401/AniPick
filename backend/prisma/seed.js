require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { animeTranslations } = require('../src/data/animeTranslations');

const prisma = new PrismaClient();

async function seedAdmin() {
  const password = await bcrypt.hash('admin1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@anipick.com' },
    update: {
      password,
      nickname: 'admin',
      role: 'ADMIN',
    },
    create: {
      email: 'admin@anipick.com',
      password,
      nickname: 'admin',
      role: 'ADMIN',
    },
  });
}

async function upsertSeedTranslation(animeId, payload) {
  const existing = await prisma.animeTranslation.findUnique({
    where: {
      animeId_lang: {
        animeId,
        lang: payload.lang,
      },
    },
  });

  if (existing?.source === 'MANUAL') return false;

  await prisma.animeTranslation.upsert({
    where: {
      animeId_lang: {
        animeId,
        lang: payload.lang,
      },
    },
    create: payload,
    update: payload,
  });

  return true;
}

async function seedAnimeTranslations() {
  let seeded = 0;

  const entries = Object.entries(animeTranslations || {});
  for (const [externalIdText, data] of entries) {
    const externalId = Number(externalIdText);
    if (!Number.isInteger(externalId) || externalId <= 0) continue;

    const anime = await prisma.anime.upsert({
      where: {
        provider_externalId: {
          provider: 'JIKAN',
          externalId,
        },
      },
      create: {
        provider: 'JIKAN',
        externalId,
        romajiTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        englishTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        nativeTitle: data.jaTitle || data.koTitle || data.enTitle || null,
        description: data.enDescription || null,
      },
      update: {
        romajiTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        englishTitle: data.enTitle || data.koTitle || data.jaTitle || null,
        nativeTitle: data.jaTitle || data.koTitle || data.enTitle || null,
        description: data.enDescription || undefined,
      },
    });

    const payloads = [
      {
        animeId: anime.id,
        lang: 'ko',
        title: data.koTitle || null,
        description: data.koDescription || null,
        source: 'SEED',
        status: data.koDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
      {
        animeId: anime.id,
        lang: 'en',
        title: data.enTitle || null,
        description: data.enDescription || null,
        source: 'SEED',
        status: data.enDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
      {
        animeId: anime.id,
        lang: 'ja',
        title: data.jaTitle || null,
        description: data.jaDescription || null,
        source: 'SEED',
        status: data.jaDescription ? 'REVIEWED' : 'TITLE_ONLY',
        failureReason: null,
      },
    ];

    for (const payload of payloads) {
      if (!payload.title && !payload.description) continue;
      // eslint-disable-next-line no-await-in-loop
      const changed = await upsertSeedTranslation(anime.id, payload);
      if (changed) seeded += 1;
    }
  }

  return seeded;
}

async function main() {
  await seedAdmin();
  const seededCount = await seedAnimeTranslations();

  console.log('Seed completed: admin user and anime translations seeded.');
  console.log(`Seeded anime translations: ${seededCount}`);
}

main()
  .catch((error) => {
    console.error('[SEED] Failed to seed data:', error.message);
    console.error('[SEED] DB가 실행 중인지 확인하세요.');
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
