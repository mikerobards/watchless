import express from 'express';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/login - Google OAuth login
router.post('/login', async (req, res): Promise<void> => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        error: 'Google credential is required'
      });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Google token'
      });
    }

    // Create user object
    const user = {
      id: payload.sub,
      email: payload.email,
      displayName: payload.name,
      createdAt: new Date(),
      preferences: {
        dailyGoal: 120, // 2 hours default
        notifications: true,
        autoExport: false,
      }
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      data: {
        user,
        token
      },
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Auth error:', error);
    res.status(400).json({
      success: false,
      error: 'Authentication failed'
    });
  }
});

// POST /api/auth/logout - User logout
router.post('/logout', (req, res): void => {
  // In a real app, you might want to blacklist the token
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// GET /api/auth/profile - Get user profile (protected route)
router.get('/profile', authenticateToken, (req: any, res): void => {
  // In Phase 1, we'll return mock data
  // In later phases, this would fetch from database
  res.json({
    success: true,
    data: {
      id: req.user.userId,
      email: req.user.email,
      displayName: 'Test User',
      createdAt: new Date(),
      preferences: {
        dailyGoal: 120,
        notifications: true,
        autoExport: false,
      }
    }
  });
});

// Middleware to authenticate JWT token
function authenticateToken(req: any, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
}

export { authenticateToken };
export default router;