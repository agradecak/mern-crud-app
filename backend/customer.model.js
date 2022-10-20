const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
    customer_name: {
        type: String
    },
    customer_surname: {
        type: String
    },
    customer_email: {
        type: String
    },
    customer_city: {
        type: String
    },
    customer_dob: {
        type: Date
    }
});

module.exports = mongoose.model('Customer', Customer);