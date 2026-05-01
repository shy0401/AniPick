const prisma = require('../lib/prisma');

async function getUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(users);
  } catch (error) {
    console.error('Admin get users error:', error);
    return res.status(500).json({ message: 'Failed to fetch users.' });
  }
}

async function getAllReviews(req, res) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json(reviews);
  } catch (error) {
    console.error('Admin get reviews error:', error);
    return res.status(500).json({ message: 'Failed to fetch reviews.' });
  }
}

async function deleteAnyReview(req, res) {
  try {
    const reviewId = Number(req.params.id);

    if (!reviewId) {
      return res.status(400).json({ message: 'Valid review id is required.' });
    }

    await prisma.review.delete({ where: { id: reviewId } });
    return res.json({ message: 'Review removed by admin.' });
  } catch (error) {
    console.error('Admin delete review error:', error);
    return res.status(500).json({ message: 'Failed to delete review.' });
  }
}

module.exports = {
  getUsers,
  getAllReviews,
  deleteAnyReview,
};
