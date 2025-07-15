const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt.util');

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    
    const user = new User({ email, password, role });
    await user.save();
    
    const token = generateToken(user);
    
    res.status(201).json({ user: { _id: user._id, email: user.email, role: user.role }, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid login credentials');
    }
    
    const token = generateToken(user);
    
    res.json({ user: { _id: user._id, email: user.email, role: user.role }, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };