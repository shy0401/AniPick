const express = require('express');
const {
  getMyWatchStatus,
  upsertWatchStatus,
  removeWatchStatus,
} = require('../controllers/watchStatus.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

/**
 * @swagger
 * /api/watch-status:
 *   get:
 *     summary: Get my watch status list
 *     description: Return authenticated user's watch status records.
 *     tags: [Watch Status]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watch status list
 */
router.get('/', getMyWatchStatus);

/**
 * @swagger
 * /api/watch-status:
 *   put:
 *     summary: Upsert watch status
 *     description: Create or update watch status by userId + animeId.
 *     tags: [Watch Status]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [animeId, animeTitle, status]
 *             properties:
 *               animeId:
 *                 type: integer
 *               animeTitle:
 *                 type: string
 *               animeImage:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PLAN_TO_WATCH, WATCHING, COMPLETED, DROPPED]
 *     responses:
 *       200:
 *         description: Watch status saved
 */
router.put('/', upsertWatchStatus);

/**
 * @swagger
 * /api/watch-status/{animeId}:
 *   delete:
 *     summary: Remove watch status
 *     description: Delete authenticated user's watch status record by animeId.
 *     tags: [Watch Status]
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
 *         description: Watch status removed
 */
router.delete('/:animeId', removeWatchStatus);

module.exports = router;
