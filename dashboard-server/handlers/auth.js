const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
  try {
    let admin = await db.Admin.findOne({
      adminName: req.body.adminName
    });
    let { id, adminName } = admin;
    let isMatch = await admin.comparePassword(req.body.password);
    if(isMatch) {
      let token = jwt.sign({
          id,
          adminName,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
          id,
          adminName,
          token
      });
    } else {
      return next({
          status: 400,
          message: 'Invalid Username/Password pair.'
      })
    }
  } catch (err) {
    console.log(err);

    return next({
      status: 400,
      message: 'No such admin in DB'
    })
  }
};

exports.signup = async function(req, res, next) {
  try {
    let admin = await db.Admin.create(req.body);
    let { id, adminName } = admin;
    console.log('going to create a token with env: ', process.env.SECRET_KEY);
    let token = jwt.sign({
      id,
      adminName
    },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      adminName,
      token
    })

  } catch (err) {
    if(err.code === 11000) {
      err.message = 'Sorry, that username is taken.'
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}