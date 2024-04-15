const express = require('express');
const app = express();
const Customer = require("../controller/customerController");
const Invoice = require("../controller/invoiceController");

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  })
  const uploadStorage = multer({ storage: storage })


app.post('/customer',uploadStorage.single("logo"),(req,res,next)=>{
    req.body['logo'] = req.file?.path ?? '';
    next();
},Customer.createCustomer);

app.get('/customer',Customer.getCustomers);

app.get('/customer/:id',Customer.getCustomerById);

app.delete('/customer/:id',Customer.deleteCustomer);

app.patch('/customer/:id',uploadStorage.single("logo"),(req,res,next)=>{
    req.body['logo'] = req.file?.path ?? '';
    next();
},Customer.updateCustomer);





app.post('/invoice',Invoice.createCustomer);
app.get('/invoice',Invoice.getCustomers);
app.get('/invoice/:id',Invoice.getCustomerById);
app.delete('/invoice/:id',Invoice.deleteCustomer);
app.patch('/invoice/:id',Invoice.updateCustomer);
app.get('/generateInvoice/:id',Invoice.generateInvoice);




module.exports = app;