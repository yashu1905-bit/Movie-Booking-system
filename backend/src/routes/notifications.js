const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { protect } = require('../middlewares/auth');

// Apply auth middleware to all notification routes
router.use(protect);

// GET /api/notifications - Get all notifications for current user
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(50); // limit to recent 50
    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch notifications' });
  }
});

// PATCH /api/notifications/:id/read - Mark single as read
router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isRead: true },
      { returnDocument: 'after' }
    );
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update notification' });
  }
});

// PATCH /api/notifications/read-all - Mark all as read
router.patch('/read-all/now', async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );
    res.json({ success: true, count: result.modifiedCount });
  } catch (error) {
    console.error('Mark all read failed:', error);
    res.status(500).json({ success: false, message: 'Failed to mark all as read' });
  }
});

// POST /api/notifications/trigger-demo
router.post('/trigger-demo', async (req, res) => {
  try {
    const demoNotifications = [
      { userId: req.user.id, title: 'New Booking', message: 'Alice booked 2 tickets for Inception in Hollywood', type: 'info' },
      { userId: req.user.id, title: 'Server Alert', message: 'Database backup completed successfully', type: 'success' },
      { userId: req.user.id, title: 'Revenue Milestone', message: 'Daily sales exceeded $5,000!', type: 'success' }
    ];
    await Notification.insertMany(demoNotifications);
    res.json({ success: true, message: 'Demo notifications triggered' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to trigger demo' });
  }
});

module.exports = router;
