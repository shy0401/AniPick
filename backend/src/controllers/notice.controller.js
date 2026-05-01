const prisma = require('../lib/prisma');

async function getNotices(req, res) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.json(notices);
  } catch (error) {
    console.error('Get notices error:', error);
    return res.status(500).json({ message: 'Failed to fetch notices.' });
  }
}

async function createNotice(req, res) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'title and content are required.' });
    }

    const notice = await prisma.notice.create({
      data: {
        title: String(title).trim(),
        content: String(content).trim(),
      },
    });

    return res.status(201).json(notice);
  } catch (error) {
    console.error('Create notice error:', error);
    return res.status(500).json({ message: 'Failed to create notice.' });
  }
}

async function deleteNotice(req, res) {
  try {
    const noticeId = Number(req.params.id);

    if (!noticeId) {
      return res.status(400).json({ message: 'Valid notice id is required.' });
    }

    await prisma.notice.delete({ where: { id: noticeId } });
    return res.json({ message: 'Notice deleted.' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return res.status(500).json({ message: 'Failed to delete notice.' });
  }
}

module.exports = {
  getNotices,
  createNotice,
  deleteNotice,
};
