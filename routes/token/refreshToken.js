let express = require('express');
let Validator = require('fastest-validator');
let router = express.Router();

const { User, RefreshToken } = require('../../models');

const v = new Validator();

const schema = {
  token: 'string',
  userId: 'number'
}

router.post('/', async (req, res) => {
  const validate = v.validate(req.body, schema);
  if(validate.length){
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }
  const user = await User.findByPk(req.body.userId);
  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found'
    });
  }
  const createdRefreshToken = await RefreshToken.create({
    token: req.body.token,
    userId: req.body.userId
  });
  return res.json({
    status: 'success',
    data: {
      id: createdRefreshToken.id
    }
  });
});

router.get('/', async(req,res) => {
  const tokenQuery = req.query.token;
  const token = await RefreshToken.findOne({
    where: {
      token: tokenQuery
    }
  });
  if (!token) {
    return res.status(400).json({
      status: 'error',
      message: 'invalid token'
    });
  }return res.json({
    status: 'success',
    token: token
  });
});


module.exports = router;
