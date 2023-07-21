const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


exports.getSignup = (req, res) => {
  res.render("signup")
}

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.cookie('token', token, { httpOnly: true });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) 
  {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.accesslogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).render('accesslogin', { message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).render('accesslogin', { message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    
    res.status(200).render('login', { message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).render('accesslogin', { message: 'Internal server error' });
  }
};


// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secret_key');
//     res.cookie('token', token, { httpOnly: true });

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     throw new Error(error.message);
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
