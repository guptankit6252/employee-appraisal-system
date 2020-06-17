const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Employee = new Schema({
  employee_name: {
    type: String
  },
  employee_email: {
    type: String
  },
  department: {
    type: String
  },
  rating: {
    type: Number
  },
  gender: {
    type: String
  },
  doj: {
    type: Date
  }
}, {
  collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)