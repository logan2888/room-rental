const { getMyNotifications, markAsRead, markAllAsRead } = require('../services/notification');

const getMine = async (req, res) => {
  try {
    const notifications = await getMyNotifications(req.userId);
    const unreadCount = notifications.filter(n => !n.read).length;
    res.status(200).json({ notifications, unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id, req.userId);
    res.status(200).json({ notification });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const markAllRead = async (req, res) => {
  try {
    await markAllAsRead(req.userId);
    res.status(200).json({ message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMine, markRead, markAllRead };