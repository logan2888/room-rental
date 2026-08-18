const { createInquiry, getMyInquiries } = require('../services/inquiry');

const create = async (req, res) => {
  try {
    const { roomId, message } = req.body;
    if (!roomId || !message) {
      return res.status(400).json({ message: 'Room ID and message are required' });
    }

    const inquiry = await createInquiry(req.userId, { roomId, message });
    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getForOwner = async (req, res) => {
  try {
    const inquiries = await getMyInquiries(req.userId);
    res.status(200).json({ count: inquiries.length, inquiries });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, getForOwner };