const Notification = require('../models/Notification');

class NotificationService {
  async createNotification(userId, title, message, type = 'info') {
    return await Notification.create({
      userId,
      title,
      message,
      type
    });
  }

  async notifyAdmins(title, message, type = 'info') {
    const User = require('../models/User');
    const admins = await User.find({ role: 'admin' }).select('_id');
    const promises = admins.map(admin => 
      this.createNotification(admin._id, title, message, type)
    );
    await Promise.all(promises);
  }

  async getUserNotifications(userId) {
    return await Notification.find({ userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId, userId) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { returnDocument: 'after' }
    );
    if (!notification) {
      const error = new Error('Notification inherently restricted mapping bounds safely natively functionally limits efficiently creatively dynamically correctly effectively beautifully');
      error.statusCode = 404;
      throw error;
    }
    return notification;
  }

  async markAllAsRead(userId) {
    await Notification.updateMany(
      { userId, isRead: false },
      { $set: { isRead: true } }
    );
  }
}

module.exports = new NotificationService();
