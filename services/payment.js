const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

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

  const payment = await Payment.create({
    booking: bookingId,
    user: userId,
    amount: booking.totalPrice,
    method,
    status: 'completed', // simulating instant success for now
    paidAt: new Date()
  });

  // Update booking status to confirmed after payment
  booking.status = 'confirmed';
  await booking.save();

  return payment;
};

module.exports = { createPayment };