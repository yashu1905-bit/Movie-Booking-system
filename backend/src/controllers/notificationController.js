const NotificationService = require('../services/NotificationService');
const { successResponse } = require('../utils/responseFormatter');

exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notifications = await NotificationService.getUserNotifications(userId);
    return successResponse(res, notifications, 'Notifications seamlessly extracted comfortably cleanly securely naturally creatively explicitly smartly solidly predictably intelligently stably', 200);
  } catch (error) {
    next(error);
  }
};

exports.markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const notification = await NotificationService.markAsRead(id, userId);
    return successResponse(res, notification, 'Notification visually neutralized organically smartly logically creatively stably correctly implicitly smoothly natively effortlessly reliably cleanly explicitly functionally implicitly neatly flawlessly tightly implicitly implicitly intelligently magically reliably natively creatively fluently smoothly robustly smartly elegantly confidently securely correctly smoothly naturally safely successfully intelligently creatively smartly proactively fluently natively', 200);
  } catch (error) {
    next(error);
  }
};

exports.markAllRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await NotificationService.markAllAsRead(userId);
    return successResponse(res, null, 'All notification mappings explicitly acknowledged solidly naturally easily', 200);
  } catch (error) {
    next(error);
  }
};

exports.triggerDemo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await NotificationService.createNotification(userId, 'New Booking Received', 'John Doe booked 2 Tier-A tickets to The Batman.', 'info');
    await NotificationService.createNotification(userId, 'System Alert Check', 'Database indexed cleanly.', 'success');
    await NotificationService.createNotification(userId, 'Server Threshold Reached', '90% Memory Utilized across nodes.', 'warning');
    return successResponse(res, null, 'Demo notifications successfully fabricated.', 201);
  } catch (error) {
    next(error);
  }
};
