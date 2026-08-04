const Booking = require('../models/Booking');
const Room = require('../models/Room');

const createBooking = async (userId, { roomId, moveInDate, moveOutDate }) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (!room.isAvailable) {
    throw new Error('Room is not available');
  }

  const inDate = new Date(moveInDate);
  const outDate = new Date(moveOutDate);

  if (inDate >= outDate) {
    throw new Error('Move-out date must be after move-in date');
  }

  // Check for overlapping bookings on the same room
  const overlapping = await Booking.findOne({
    room: roomId,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      { moveInDate: { $lt: outDate }, moveOutDate: { $gt: inDate } }
    ]
  });

  if (overlapping) {
    throw new Error('Room is already booked for these dates');
  }

  // Calculate total price based on number of months (rounded up)
  const months = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24 * 30));
  const totalPrice = months * room.pricePerMonth;

  const booking = await Booking.create({
    user: userId,
    room: roomId,
    moveInDate: inDate,
    moveOutDate: outDate,
    totalPrice
  });

  return booking;
};

const getUserBookings = async (userId) => {
  return Booking.find({ user: userId }).populate('room');
};
const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== userId) {
    throw new Error('You can only cancel your own booking');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking is already cancelled');
  }

  booking.status = 'cancelled';
  await booking.save();

  return booking;
};
module.exports = { createBooking, getUserBookings, cancelBooking };