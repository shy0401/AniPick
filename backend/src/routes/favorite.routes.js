const express = require('express');
const {
  getMyFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
} = require('../controllers/favorite.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get my favorites
 *     description: Return authenticated user's favorite anime list.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorite list
 */
router.get('/', getMyFavorites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add favorite
 *     description: Add anime to favorites. Duplicate favorite is prevented.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, animeTitle]
 *             properties:
 *               animeId:
 *                 type: integer
 *                 example: 1
 *               animeTitle:
 *                 type: string
 *                 example: Cowboy Bebop
 *               animeImage:
 *                 type: string
 *                 example: https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1.jpg
 *     responses:
 *       201:
 *         description: Favorite created
 */
router.post('/', addFavorite);

/**
 * @swagger
 * /api/favorites/{animeId}:
 *   delete:
 *     summary: Remove favorite
 *     description: Remove anime from favorites by animeId.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite removed
 */
router.delete('/:animeId', removeFavorite);

/**
 * @swagger
 * /api/favorites/{animeId}/status:
 *   get:
 *     summary: Check favorite status
 *     description: Return whether authenticated user already favorited this anime.
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Favorite status
 */
router.get('/:animeId/status', checkFavorite);

module.exports = router;
