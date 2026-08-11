const { createPayment, getPaymentByBooking } = require('../services/payment');
const { validatePayment } = require('../validators/payment');
const Payment = require('../models/Payment');

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

const uploadProof = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'You can only upload proof for your own payment' });
    }

    payment.proofImage = req.file.path;
    await payment.save();

    res.status(200).json({ message: 'Proof uploaded successfully', payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getByBooking = async (req, res) => {
  try {
    const payment = await getPaymentByBooking(req.params.bookingId, req.userId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { create, uploadProof, getByBooking };