const mongoose = require('mongoose');

const multiple = new mongoose.Schema({
    description : String,
    fromDate : Date,
    endDate : Date,
    amt : Number
});

// Define the schema
const customerSchema = new mongoose.Schema({
    customer: {
    type: mongoose.Types.ObjectId,
    ref : 'Customer',
    required: true
  },
  multiple : [multiple],
  subtotal : Number,
  cgst : Number,
  sgst:Number,
  totalAmount : Number,
  invoiceNumber : String

},{
    timestamps: true // Add timestamps option
  });

 
customerSchema.pre('save', async function(next) {
    let cntDocs = await this.constructor.countDocuments();
    let cnt = String(cntDocs).padStart(4, "0");
    console.log(cnt);
    this.invoiceNumber = cnt;
  });


// Create a model using the schema
const Invoice = mongoose.model('Invoice', customerSchema);


module.exports = Invoice;