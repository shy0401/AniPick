const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger/swagger');
const authRoutes = require('./routes/auth.routes');
const animeRoutes = require('./routes/anime.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const reviewRoutes = require('./routes/review.routes');
const watchStatusRoutes = require('./routes/watchStatus.routes');
const adminRoutes = require('./routes/admin.routes');
const noticeRoutes = require('./routes/notice.routes');
const translationRoutes = require('./routes/translation.routes');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'AniPick backend is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/anime', animeRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/watch-status', watchStatusRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/translations', translationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

module.exports = app;
