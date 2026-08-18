const Inquiry = require('../models/Inquiry');
const Room = require('../models/Room');
const User = require('../models/User');
const { sendInquiryEmail } = require('./email');

const createInquiry = async (senderId, { roomId, message }) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  const inquiry = await Inquiry.create({
    room: roomId,
    owner: room.owner,
    sender: senderId,
    message
  });

  const owner = await User.findById(room.owner);
  const sender = await User.findById(senderId);

  if (owner && sender) {
    sendInquiryEmail(owner.email, sender, room, message)
      .then(() => console.log('Inquiry email sent'))
      .catch(err => console.error('Failed to send inquiry email:', err.message));
  }

  return inquiry;
};

const getMyInquiries = async (ownerId) => {
  return Inquiry.find({ owner: ownerId })
    .populate('room', 'title')
    .populate('sender', 'name email phone')
    .sort({ createdAt: -1 });
};

module.exports = { createInquiry, getMyInquiries };