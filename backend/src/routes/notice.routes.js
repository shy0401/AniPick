const express = require('express');
const { getNotices, createNotice, deleteNotice } = require('../controllers/notice.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/notices:
 *   get:
 *     summary: Get notices
 *     description: Public notice list.
 *     tags: [Notices]
 *     responses:
 *       200:
 *         description: Notice list
 */
router.get('/', getNotices);

/**
 * @swagger
 * /api/notices:
 *   post:
 *     summary: Create notice
 *     description: Create notice. Admin only.
 *     tags: [Notices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notice created
 */
router.post('/', authMiddleware, adminMiddleware, createNotice);

/**
 * @swagger
 * /api/notices/{id}:
 *   delete:
 *     summary: Delete notice
 *     description: Delete notice by id. Admin only.
 *     tags: [Notices]
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
 *         description: Notice removed
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteNotice);

module.exports = router;
