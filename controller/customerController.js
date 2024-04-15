const Customer = require('../model/customer');
const aqp = require('api-query-params');


// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
      
      const regularObject1 = Object.assign({}, req.body);
      const customer = await Customer.create(regularObject1);
      return res.status(201).json({ success: true, data: customer });
    } catch (error) {
        console.log(error);
     return res.status(400).json({ success: false, error: error.message });
    }
  };
  
  // Get all customers with filtering, sorting, pagination
  exports.getCustomers = async (req, res) => {
    try {
      const { filter, skip, limit, sort } = aqp(req.query);
      const customers = await Customer.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort);

        const count =  await Customer.countDocuments();
     return res.status(200).send({ success: true, data: customers , skip : skip , limit :  limit , count : count});
    } catch (error) {
        console.log(error);
     return res.status(400).send({ success: false, error: error.message });
    }
  };
  
  // Get a single customer by ID
  exports.getCustomerById = async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
      }
      res.json({ success: true, data: customer });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
  // Update a customer by ID
  exports.updateCustomer = async (req, res) => {
    try {
      const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!customer) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
      }
      res.json({ success: true, data: customer });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  
  // Delete a customer by ID
  exports.deleteCustomer = async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).json({ success: false, error: 'Customer not found' });
      }
      res.json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

 