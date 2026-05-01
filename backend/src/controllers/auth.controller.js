const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

function getJwtSecret() {
  if (!process.env.JWT_SECRET) {
    console.warn('[AUTH] JWT_SECRET is not set. Using fallback_secret for development only.');
  }

  return process.env.JWT_SECRET || 'fallback_secret';
}

function buildAuthResponse(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    },
  };
}

async function register(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const nickname = String(req.body.nickname || '').trim();

    if (!email || !password || !nickname) {
      return res.status(400).json({ message: 'email, password, nickname are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Email is already in use.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        nickname,
        role: 'USER',
      },
    });

    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    console.error('[AUTH] Register error:', error.message);
    return res.status(500).json({ message: 'Failed to register user.' });
  }
}

async function login(req, res) {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json(buildAuthResponse(user));
  } catch (error) {
    console.error('[AUTH] Login error:', error.message);
    return res.status(500).json({ message: 'Failed to login.' });
  }
}

async function me(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json(user);
  } catch (error) {
    console.error('[AUTH] Me error:', error.message);
    return res.status(500).json({ message: 'Failed to fetch current user.' });
  }
}

module.exports = {
  register,
  login,
  me,
};
