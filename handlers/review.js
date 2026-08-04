const { createReview, getRoomReviews } = require('../services/review');
const { validateReview } = require('../validators/review');

const create = async (req, res) => {
  try {
    const { isValid, errors } = validateReview(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const review = await createReview(req.userId, req.body);
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getForRoom = async (req, res) => {
  try {
    const reviews = await getRoomReviews(req.params.roomId);
    res.status(200).json({ count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, getForRoom };