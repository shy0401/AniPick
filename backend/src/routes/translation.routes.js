const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  getTranslations,
  putTranslation,
  autoTranslate,
  deleteTranslation,
  getOpenAIModelStatus,
} = require('../controllers/translation.controller');

const router = express.Router();

router.get('/openai/models', authMiddleware, adminMiddleware, getOpenAIModelStatus);
router.get('/:provider/:externalId', getTranslations);
router.put('/:provider/:externalId', authMiddleware, adminMiddleware, putTranslation);
router.post('/:provider/:externalId/auto', authMiddleware, adminMiddleware, autoTranslate);
router.delete('/:provider/:externalId/:lang', authMiddleware, adminMiddleware, deleteTranslation);

module.exports = router;
