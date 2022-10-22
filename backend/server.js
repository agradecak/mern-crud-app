const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dateFns = require('date-fns');
const customerRoutes = express.Router();
const port = 4000;
const prices = require('./base_price.json');
const discounts = require('./discount.json');

let Customer = require('./customer.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/customers', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Connection to MongoDB database successful.")
})

customerRoutes.route('/').get(function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);
        }
    });
});

customerRoutes.route('/:id').get(function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        res.json(customer);
    });
});

customerRoutes.route('/add').post(function(req, res) {
    let customer = new Customer(req.body);
    customer.save()
            .then(customer => {
                res.status(200).json("Customer added successfully!");
            })
            .catch(err => {
                res.status(400).send("Adding new customer failed.");
            });
});

customerRoutes.route('/update/:id').post(function(req, res){
    Customer.findById(req.params.id, function(err, customer) {
        if (!customer)
            res.status(404).send("Data not found.")
        else
            customer.customer_name = req.body.customer_name;
            customer.customer_surname = req.body.customer_surname;
            customer.customer_email = req.body.customer_email;
            customer.customer_city = req.body.customer_city;
            customer.customer_dob = req.body.customer_dob;

            customer.save().then(customer => {
                res.json("Customer updated!");
            })
            .catch(err => {
                res.status(400).send("Update not possible.");
            });
    });
});

customerRoutes.route('/delete/:id').delete(function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if (!customer)
            res.status(404).send("Data not found.")
        else
            customer.delete().then(() => {
                res.json("Customer deleted!");
            })
            .catch(err => {
                res.status(400).send("Deletion not possible.");
            });
    });
});

customerRoutes.route('/insurance/:id').get(function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if (!customer)
            res.status(404).send("Data not found.")
        else {
            let custAge = dateFns.differenceInYears(new Date(), customer.customer_dob);
            let custDiscountItem = discounts.find(function(item) {
                let itemRange = item.age;
                let itemMinMax = itemRange.split("-");
                let itemMin = Number(itemMinMax[0]);
                let itemMax = Number(itemMinMax[1]);
                if (custAge >= itemMin && custAge < itemMax)
                    return item;
            });
            let custDiscount = custDiscountItem.discount;
            
            let custCity= customer.customer_city;
            let custCityLcase = custCity.toLowerCase();
            let custPriceItem = prices.find(function(item) {
                if (item.city == "other")
                    return item;
                else {
                    let itemCity = item.city;
                    let itemCityLcase = itemCity.toLowerCase();
                    if (itemCityLcase === custCityLcase)
                        return item;
                }
            });
            let custPrice = custPriceItem.amount;

            let insurance = custPrice  - (custPrice * (custDiscount/100));
            res.json({"customer_insurance": insurance});
        }
    });
});


app.use('/customers', customerRoutes);

app.listen(port, function() {
    console.log("Server running on port " + port);
})