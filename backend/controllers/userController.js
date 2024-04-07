const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// handle error
const handleErrors = (err) => {
    let errors = {email: '', password: ''};

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }
    
    // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}
// create json web token (in sec)
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STRING , {
    expiresIn: maxAge
  });
};

const register_post = async (req,res) => {
    const {name, email, password} = req.body;

    try{
        const user = await User.create({name, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); // (in mili sec)
        res.status(201).json({'redirect': '/'});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const login_post = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.login(email, password);

        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({'redirect': '/'});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}
const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({'redirect': '/'});
}

const currUser_get = async (req,res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_STRING , async (err, decodedToken) => {
      if (err) {
        res.status(400).send('couldnot verify user')
      } else {
        let user = await User.findById(decodedToken.id);
        res.status(200).json({user});
      }
    });
  } else {
    res.status(400).send('User not logged in');
  }
}

const findUser_get = async(req, res) => {
  const userId = req.params.userId;
  try{
    const user = await User.findById(userId);

    res.status(200).json(user);
  }
  catch(err){
    console.log(err);
    res.status(500).json(error);
  }
}

const allUsers_get = async(req, res) => {
  const userId = req.params.userId;
  try{
    const users = await User.find();

    res.status(200).json(users);
  }
  catch(err){
    console.log(err);
    res.status(500).json(error);
  }
}






module.exports = 
{
  register_post,
  login_post, 
  findUser_get,
  allUsers_get,
  currUser_get,
  logout_get,
};