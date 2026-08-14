const { getAllUsers, deleteUser, getStats } = require('../services/admin');

const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const stats = async (req, res) => {
  try {
    const data = await getStats();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listUsers, removeUser, stats };