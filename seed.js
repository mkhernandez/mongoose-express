const mongoose = require('mongoose');
const Product = require('./models/product');
const log = console.log;

// Connection to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')// <= In here 127.0.0.1 because error thrown with "localhost"
.then(() => {
    log("MONGO CONNECTION OPEN!");
})
.catch(err => {
    log("OH NO, MONGO CONNECTION ERROR!");
    log(err);
});

// Here we are making one product and adding it to our db collection
// const p = new Product({
//     name: "Ruby Grapefruit",
//     price: 1.99,
//     category: "fruits"
// })
// .save().then(product => log(product))
// .catch(err => {
//     log("SOMETHING WENT WRONG!");
//     log(err);
// });

// We can insertMany instead of adding and saving each one individually
// hard code an array with seed data
const seedData = [
    {
        name: "Fairy Eggplant",
        price: 1.00,
        category: "vegetables"
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: "fruits"
    },
    {
        name: "Organic Mini Seedless Watermelon",
        price: 3.99,
        category: "fruits"
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: "vegetables"
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.69,
        category: "dairy"
    },
    {
        name: "Organic Farm Fresh Eggs",
        price: 5.99,
        category: "poultry"
    }
];

Product.insertMany(seedData)
.then(res => {
    log(res);
})
.catch(e => {
    log(e);
});