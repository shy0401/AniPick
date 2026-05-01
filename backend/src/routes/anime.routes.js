const express = require('express');
const {
  getTrendingAnime,
  getPopularThisSeason,
  searchAnime,
  getAnimeDetail,
  getRecommendations,
  testProvider,
  testAniListConnection,
  debugAnimeTitle,
} = require('../controllers/anime.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/anime/trending:
 *   get:
 *     summary: Get trending anime
 *     description: Fetch trending anime from AniList using GraphQL API.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Trending anime list
 */
router.get('/trending', getTrendingAnime);

/**
 * @swagger
 * /api/anime/popular-season:
 *   get:
 *     summary: Get popular anime in current season
 *     description: Fetch season-based popular anime using current season and year.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Seasonal popular anime list
 */
router.get('/popular-season', getPopularThisSeason);

/**
 * @swagger
 * /api/anime/search:
 *   get:
 *     summary: Search anime with filters
 *     description: Search anime by keyword, genre, year, season, format with pagination.
 *     tags: [Anime]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *       - in: query
 *         name: season
 *         schema:
 *           type: string
 *           enum: [WINTER, SPRING, SUMMER, FALL]
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [TV, TV_SHORT, MOVIE, SPECIAL, OVA, ONA, MUSIC]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/search', searchAnime);
router.get('/test-provider', testProvider);

/**
 * @swagger
 * /api/anime/test-anilist:
 *   get:
 *     summary: Test AniList connection
 *     description: Sends a minimal query to AniList and returns one sample record.
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Connection test result
 */
router.get('/test-anilist', testAniListConnection);
router.get('/debug-title/:id', debugAnimeTitle);

/**
 * @swagger
 * /api/anime/recommendations:
 *   get:
 *     summary: Get personalized recommendations
 *     description: Recommend by top genre from user's favorites. Fallback to trending when favorites are empty.
 *     tags: [Anime]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recommendation list
 */
router.get('/recommendations', authMiddleware, getRecommendations);

/**
 * @swagger
 * /api/anime/{id}:
 *   get:
 *     summary: Get anime detail by AniList ID
 *     description: Fetch a single anime detail with description and studio info.
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anime detail
 */
router.get('/:id', getAnimeDetail);

module.exports = router;
