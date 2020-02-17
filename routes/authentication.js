'use strict';

const { Router } = require('express');
const router = new Router();

const bcryptjs = require('bcryptjs');

const User = require('../models/user');

router.get('/sign-in', (req, res) => {
  res.render('authentication/sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  let user;

  User.findOne({ username })
    .then(document => {
      if (!document) {
        next(new Error('USER_NOT_FOUND'));
      } else {
        user = document;
        return bcryptjs.compare(password, document.passwordHash);
      }
    })
    .then(match => {
      if (match) {
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        next(new Error('USER_PASSWORD_WRONG'));
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  console.log(req.body);
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        passwordHash: hash
      });
    })
    .then(user => {
      console.log('Create', user);
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
