const User = require('../models/User');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

const getAllUsers = async () => {
  return User.find().select('-password');
};

const deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  await user.deleteOne();
  return { message: 'User deleted' };
};

const getStats = async () => {
  const totalUsers = await User.countDocuments();
  const totalOwners = await User.countDocuments({ role: 'owner' });
  const totalTenants = await User.countDocuments({ role: 'tenant' });
  const totalRooms = await Room.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Payment.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$platformFee' } } }
  ]);

  return {
    totalUsers,
    totalOwners,
    totalTenants,
    totalRooms,
    totalBookings,
    totalPlatformRevenue: totalRevenue[0]?.total || 0
  };
};

module.exports = { getAllUsers, deleteUser, getStats };