const Review = require('../models/Review');
const Booking = require('../models/Booking');

const createReview = async (userId, { bookingId, rating, comment }) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== userId) {
    throw new Error('You can only review your own booking');
  }

  if (booking.status !== 'confirmed') {
    throw new Error('You can only review a confirmed booking');
  }

  const existingReview = await Review.findOne({ booking: bookingId });
  if (existingReview) {
    throw new Error('You already reviewed this booking');
  }

  const review = await Review.create({
    user: userId,
    room: booking.room,
    booking: bookingId,
    rating,
    comment
  });

  return review;
};

const getRoomReviews = async (roomId) => {
  const reviews = await Review.find({ room: roomId }).populate('user', 'name');
  return reviews;
};

module.exports = { createReview, getRoomReviews };