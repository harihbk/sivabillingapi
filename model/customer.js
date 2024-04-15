const mongoose = require('mongoose');

// Define the schema
const customerSchema = new mongoose.Schema({
    customerName: {
    type: String,
    required: true
  },
  customerAdress: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true,
   
  },
  customerPhoneno: {
    type: String,
    required: true
  },
  customerGstno: {
    type: String,
    required: true
  },
  logo: {
    type: String
   
  }
},{
    timestamps: true // Add timestamps option
  });

// Create a model using the schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;