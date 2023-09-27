const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const app = express();
const port = 5000;
const localhost = "localhost";
const log = console.log;

// Connection to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')// <= In here 127.0.0.1 because error thrown with "localhost"
.then(() => {
    log("MONGO CONNECTION OPEN!");
})
.catch(err => {
    log("OH NO, MONGO CONNECTION ERROR!");
    log(err);
})

// Set the view engine and views path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ROUTES 
// These will be moved eventually into their own file.
app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
});

app.listen(port, localhost, () => {
    log(`Listening on http://${localhost}: ${port}`);
});