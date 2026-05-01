const express = require('express');
const {
  getReviewsByAnime,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/reviews/anime/{animeId}:
 *   get:
 *     summary: Get reviews by anime id
 *     description: Return all reviews for specific anime with reviewer nickname.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: animeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Anime reviews
 */
router.get('/anime/:animeId', getReviewsByAnime);

/**
 * @swagger
 * /api/reviews/me:
 *   get:
 *     summary: Get my reviews
 *     description: Return authenticated user's own reviews.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: My reviews
 */
router.get('/me', authMiddleware, getMyReviews);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create review
 *     description: Create a review for an anime with rating from 1 to 5.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, rating, content]
 *             properties:
 *               animeId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 */
router.post('/', authMiddleware, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Update review
 *     description: Update own review (or any review if ADMIN).
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review updated
 */
router.put('/:id', authMiddleware, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Delete review
 *     description: Delete own review (or any review if ADMIN).
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deleted
 */
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
