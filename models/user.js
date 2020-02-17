'use strict';

// User model goes here

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);
