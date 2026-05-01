const express = require('express');
const { getUsers, getAllReviews, deleteAnyReview } = require('../controllers/admin.controller');
const {
  getAdminTranslationCoverage,
  getMissingTranslations,
  createAdminTranslationJobs,
  runAdminTranslationJobs,
  putTranslation,
  reviewTranslation,
  retryTranslation,
  getOpenAIModelStatus,
} = require('../controllers/translation.controller');
const {
  getAdminAnimeList,
  getAdminAnimeById,
  hideAdminAnime,
  unhideAdminAnime,
  markAdminAnimeAdult,
  archiveAdminAnime,
  hardDeleteAdminAnime,
} = require('../controllers/adminAnime.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Admin - user list
 *     description: Get all users. Admin only.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 */
router.get('/users', getUsers);

/**
 * @swagger
 * /api/admin/reviews:
 *   get:
 *     summary: Admin - review list
 *     description: Get all reviews. Admin only.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Review list
 */
router.get('/reviews', getAllReviews);

/**
 * @swagger
 * /api/admin/reviews/{id}:
 *   delete:
 *     summary: Admin - delete review
 *     description: Delete any review by id. Admin only.
 *     tags: [Admin]
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
 *         description: Review removed
 */
router.delete('/reviews/:id', deleteAnyReview);

router.get('/translations/coverage', getAdminTranslationCoverage);
router.get('/translations/openai/models', getOpenAIModelStatus);
router.get('/translations/missing', getMissingTranslations);
router.post('/translations/jobs', createAdminTranslationJobs);
router.post('/translations/jobs/run', runAdminTranslationJobs);
router.put('/translations/:provider/:externalId', putTranslation);
router.post('/translations/:provider/:externalId/review', reviewTranslation);
router.post('/translations/:provider/:externalId/retry', retryTranslation);

router.get('/anime', getAdminAnimeList);
router.get('/anime/:id', getAdminAnimeById);
router.patch('/anime/:id/hide', hideAdminAnime);
router.patch('/anime/:id/unhide', unhideAdminAnime);
router.patch('/anime/:id/mark-adult', markAdminAnimeAdult);
router.delete('/anime/:id', archiveAdminAnime);
router.delete('/anime/:id/hard', hardDeleteAdminAnime);

module.exports = router;
