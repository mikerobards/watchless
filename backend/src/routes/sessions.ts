import express from 'express';
import { authenticateToken } from './auth';

const router = express.Router();

// POST /api/sessions/start - Start viewing session
router.post('/start', authenticateToken, (req: any, res) => {
  try {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const session = {
      id: sessionId,
      userId: req.user.userId,
      startTime: now,
      duration: 0,
      isActive: true,
      createdAt: now,
    };

    // In Phase 1, we just return the session
    // In later phases, this would be saved to Firestore
    res.json({
      success: true,
      data: session,
      message: 'Session started successfully'
    });

  } catch (error) {
    console.error('Start session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start session'
    });
  }
});

// PUT /api/sessions/:id/stop - Stop viewing session
router.put('/:id/stop', authenticateToken, (req: any, res) => {
  try {
    const { id } = req.params;
    const { showName } = req.body;
    const now = new Date();

    // Mock session data - in real app, this would be fetched from database
    const session = {
      id,
      userId: req.user.userId,
      startTime: new Date(Date.now() - 3600000), // 1 hour ago for demo
      endTime: now,
      duration: 60, // minutes
      showName,
      isActive: false,
      createdAt: new Date(Date.now() - 3600000),
    };

    console.log('Session completed:', session);

    res.json({
      success: true,
      data: session,
      message: 'Session stopped successfully'
    });

  } catch (error) {
    console.error('Stop session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to stop session'
    });
  }
});

// GET /api/sessions/active - Get active session
router.get('/active', authenticateToken, (req: any, res) => {
  try {
    // In Phase 1, return null (no active session)
    // In later phases, this would check database for active sessions
    res.json({
      success: true,
      data: null,
      message: 'No active session'
    });

  } catch (error) {
    console.error('Get active session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get active session'
    });
  }
});

// PUT /api/sessions/:id/update - Update session (add show name)
router.put('/:id/update', authenticateToken, (req: any, res) => {
  try {
    const { id } = req.params;
    const { showName } = req.body;

    // Mock update - in real app, this would update database
    const updatedSession = {
      id,
      userId: req.user.userId,
      showName,
      updatedAt: new Date(),
    };

    console.log('Session updated:', updatedSession);

    res.json({
      success: true,
      data: updatedSession,
      message: 'Session updated successfully'
    });

  } catch (error) {
    console.error('Update session error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update session'
    });
  }
});

export default router;