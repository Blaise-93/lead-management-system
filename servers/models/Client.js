const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config()
const jwt = require('jsonwebtoken');


const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 4,
      },

    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          `Please provide a valid email which must contain ' @. and alpha-characters'`,
        ],
        unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6
    },
    phone: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 12,
        minlength: 10,
    }
})

/** Implemented JWT token hashing algorithm for each client prior
 * to registration and logging of the password, and checking the 
 * said/claimed password before assigning the client any project.
  */

ClientSchema.pre('save', async function(next) {
  // generate encrypted salt token of 10
  const salt = await bcrypt.genSalt(10)
  //hash the password with salt attached to it
  this.password = bcrypt.hash(this.password, salt)
  next()
})

//schema jwt
ClientSchema.methods.createJWT = function() {
  return jwt.sign({ clientId: this._id, name:this.name },
      process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME}
    )
}

// compare password
ClientSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}


module.exports = mongoose.model("Client", ClientSchema);