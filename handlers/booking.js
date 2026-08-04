const { createBooking, getUserBookings, cancelBooking } = require('../services/booking');
const { validateBooking } = require('../validators/booking');

const create = async (req, res) => {
  try {
    const { isValid, errors } = validateBooking(req.body);
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const booking = await createBooking(req.userId, req.body);
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await getUserBookings(req.userId);
    res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const cancel = async (req, res) => {
  try {
    const booking = await cancelBooking(req.params.id, req.userId);
    res.status(200).json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { create, getMyBookings, cancel };