const validateBooking = (data) => {
  const errors = {};

  if (!data.roomId) {
    errors.roomId = 'Room ID is required';
  }

  if (!data.moveInDate) {
    errors.moveInDate = 'Move-in date is required';
  }

  if (!data.moveOutDate) {
    errors.moveOutDate = 'Move-out date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateBooking };