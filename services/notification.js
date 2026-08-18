const Notification = require('../models/Notification');

const createNotification = async (userId, message, link) => {
  return Notification.create({ user: userId, message, link });
};

const getMyNotifications = async (userId) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(20);
};

const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOne({ _id: notificationId, user: userId });
  if (!notification) throw new Error('Notification not found');
  notification.read = true;
  await notification.save();
  return notification;
};

const markAllAsRead = async (userId) => {
  await Notification.updateMany({ user: userId, read: false }, { read: true });
};

module.exports = { createNotification, getMyNotifications, markAsRead, markAllAsRead };