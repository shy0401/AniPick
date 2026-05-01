const prisma = require('../lib/prisma');

async function getReviewsByAnime(req, res) {
  try {
    const animeId = Number(req.params.animeId);

    if (!animeId) {
      return res.status(400).json({ message: 'Valid animeId is required.' });
    }

    const reviews = await prisma.review.findMany({
      where: { animeId },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

async function getMyReviews(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Get my reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch your reviews.' });
  }
}

async function createReview(req, res) {
  try {
    const { animeId, rating, content } = req.body;

    if (!animeId || !rating || !content) {
      return res.status(400).json({ message: 'animeId, rating, and content are required.' });
    }

    const normalizedRating = Number(rating);
    if (Number.isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
      return res.status(400).json({ message: 'rating must be between 1 and 5.' });
    }

    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        animeId: Number(animeId),
        rating: normalizedRating,
        content: String(content).trim(),
      },
      include: {
        user: {
          select: { id: true, nickname: true },
        },
      },
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    return res.status(500).json({ message: 'Failed to create review.' });
  }
}

async function updateReview(req, res) {
  try {
    const reviewId = Number(req.params.id);
    const { rating, content } = req.body;

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    const existing = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!existing) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (existing.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'You can only update your own review.' });
    }

    const data = {};

    if (rating !== undefined) {
      const normalizedRating = Number(rating);
      if (Number.isNaN(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
        return res.status(400).json({ message: 'rating must be between 1 and 5.' });
      }
      data.rating = normalizedRating;
    }

    if (content !== undefined) {
      const normalizedContent = String(content).trim();
      if (!normalizedContent) {
        return res.status(400).json({ message: 'content cannot be empty.' });
      }
      data.content = normalizedContent;
    }

    const updated = await prisma.review.update({
      where: { id: reviewId },
      data,
    });

    return res.json(updated);
  } catch (error) {
    console.error('Update review error:', error);
    return res.status(500).json({ message: 'Failed to update review.' });
  }
}

async function deleteReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    const existing = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!existing) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    if (existing.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'You can only delete your own review.' });
    }

    await prisma.review.delete({ where: { id: reviewId } });
    return res.json({ message: 'Review deleted.' });
  } catch (error) {
    console.error('Delete review error:', error);
    return res.status(500).json({ message: 'Failed to delete review.' });
  }
}

module.exports = {
  getReviewsByAnime,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
};
