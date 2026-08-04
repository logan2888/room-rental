const { createPayment } = require('../services/payment');
const { validatePayment } = require('../validators/payment');

const create = async (req, res) => {
  try {
    const { isValid, errors } = validatePayment(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const payment = await createPayment(req.userId, req.body);
    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { create };