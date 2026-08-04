const validateReview = (data) => {
  const errors = {};

  if (!data.bookingId) {
    errors.bookingId = 'Booking ID is required';
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateReview };