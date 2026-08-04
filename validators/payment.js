const validatePayment = (data) => {
  const errors = {};

  if (!data.bookingId) {
    errors.bookingId = 'Booking ID is required';
  }

  if (!data.method || !['cash', 'esewa', 'khalti', 'bank_transfer'].includes(data.method)) {
    errors.method = 'Valid payment method is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validatePayment };