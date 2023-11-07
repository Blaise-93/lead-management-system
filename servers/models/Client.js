const mongoose = require('mongoose');

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
    phone: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 12,
        minlength: 10,
    }
})
 

module.exports = mongoose.model("Client", ClientSchema);