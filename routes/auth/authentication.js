require('dotenv').config();
let express = require('express');
let Validator = require('fastest-validator');
let router = express.Router();

const {
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED
} = process.env

const { User, RefreshToken } = require('../../models');

const v = new Validator();

const schemaLogin = {
  email: 'email|empty:false',
  password: 'string|min:6'
}

const schemaRegister = {
  fullName: 'string|empty:false',
  email: 'email|empty:false',
  password: 'string|min:6'
}

router.post('/login', async (req, res) => {
  const validate = v.validate(req.body, schemaLogin);
  if(validate.length){
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(!user){
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  if(req.body.password != user.password){
    return res.status(404).json({
      status: 'error',
      message: 'wrong password'
    });
  }

  return res.json({
    status: 'success',
    data: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status
    }
  });
});

router.post('/register', async (req, res) => {
  const validate = v.validate(req.body, schemaRegister);
  if(validate.length){
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user) {
    return res.status(409).json({
      status: 'error',
      message: 'email already exist'
    });
  }
  let data = {
    fullName: req.body.fullName,
    role: 0,
    email: req.body.email,
    password: req.body.password,
    status: 0,
  }
  const createdUser = await User.create(data);
  return res.json({
    status: 'success',
    data: createdUser.id
  });
});

router.delete('/', async(req, res) => {
  const user = await User.findOne({
    where: {
      id: req.body.userId
    }
  });
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  await RefreshToken.destroy({
    where: {
      userId: req.body.userId
    }
  });
  return res.json({
    status: 'success',
    message: 'refresh token deleted'
  });
});

module.exports = router;
