const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPasswordHandler } = require('./auth');
const { create, getAll, getOne, update, remove, getMyRooms, uploadImage, deleteImage } = require('./room');
const { create: createBooking, getMyBookings, cancel: cancelBooking, getForOwner: getBookingsForOwner } = require('./booking');
const { create: createPayment, uploadProof, getByBooking } = require('./payment');
const { create: createReview, getForRoom } = require('./review');
const { listUsers, removeUser, stats } = require('./admin');
const { create: createInquiry, getForOwner: getInquiriesForOwner } = require('./inquiry');
const { protect, adminOnly } = require('../middlewares/auth');
const upload = require('../config/multer');

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPasswordHandler);

router.post('/rooms', protect, create);
router.get('/rooms', getAll);
router.get('/rooms/my', protect, getMyRooms);
router.get('/rooms/:id', getOne);
router.put('/rooms/:id', protect, update);
router.delete('/rooms/:id', protect, remove);
router.post('/rooms/:id/upload-image', protect, upload.array('images', 5), uploadImage);
router.delete('/rooms/:id/image', protect, deleteImage);

router.post('/bookings', protect, createBooking);
router.get('/bookings/my', protect, getMyBookings);
router.get('/bookings/owner', protect, getBookingsForOwner);
router.put('/bookings/:id/cancel', protect, cancelBooking);

router.post('/payments', protect, createPayment);
router.post('/payments/:id/upload-proof', protect, upload.single('image'), uploadProof);
router.get('/payments/booking/:bookingId', protect, getByBooking);

router.post('/reviews', protect, createReview);
router.get('/reviews/room/:roomId', getForRoom);

router.post('/inquiries', protect, createInquiry);
router.get('/inquiries/owner', protect, getInquiriesForOwner);

router.get('/admin/users', protect, adminOnly, listUsers);
router.delete('/admin/users/:id', protect, adminOnly, removeUser);
router.get('/admin/stats', protect, adminOnly, stats);

module.exports = router;