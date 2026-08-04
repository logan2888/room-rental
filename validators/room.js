const validateRoom = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!data.type || !['single', 'shared', 'apartment'].includes(data.type)) {
    errors.type = 'Type must be single, shared, or apartment';
  }

  if (!data.pricePerMonth || data.pricePerMonth <= 0) {
    errors.pricePerMonth = 'Price must be greater than 0';
  }

  if (!data.location || !data.location.city || !data.location.address) {
    errors.location = 'City and address are required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = { validateRoom };