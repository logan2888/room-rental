const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const User = require('../models/User');
const { sendBookingConfirmation, sendOwnerBookingNotification } = require('./email');
const { createNotification } = require('./notification');

const createPayment = async (userId, { bookingId, method }) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== userId) {
    throw new Error('You can only pay for your own booking');
  }

  const existingPayment = await Payment.findOne({ booking: bookingId, status: 'completed' });
  if (existingPayment) {
    throw new Error('This booking is already paid');
  }

  const room = await Room.findById(booking.room);
  if (!room) {
    throw new Error('Room not found');
  }

  const advancePercent = Number(process.env.ADVANCE_PERCENT) || 24;
  const advanceAmount = Math.round(room.pricePerMonth * (advancePercent / 100));
  const platformFee = Math.round(advanceAmount / 6);
  const ownerAmount = advanceAmount - platformFee;

  const payment = await Payment.create({
    booking: bookingId,
    user: userId,
    amount: advanceAmount,
    platformFee,
    ownerAmount,
    method,
    status: 'completed',
    paidAt: new Date()
  });

  booking.status = 'confirmed';
  await booking.save();

  room.isAvailable = false;
  await room.save();

  const user = await User.findById(userId);
  const owner = await User.findById(room.owner);

  if (room && user) {
    sendBookingConfirmation(user.email, booking, room)
      .then(() => console.log('Tenant confirmation email sent'))
      .catch(err => console.error('Failed to send tenant email:', err.message));
  }

  if (room && owner && user) {
    sendOwnerBookingNotification(owner.email, user, booking, room)
      .then(() => console.log('Owner notification email sent'))
      .catch(err => console.error('Failed to send owner email:', err.message));
  }
    if (owner) {
    createNotification(owner._id, `New booking on "${room.title}" from ${user.name}`, `/owner-bookings`)
      .catch(err => console.error('Failed to create notification:', err.message));
  }

  return payment;
};

const getPaymentByBooking = async (bookingId, userId) => {
  const payment = await Payment.findOne({ booking: bookingId, user: userId });
  return payment;
};

module.exports = { createPayment, getPaymentByBooking };