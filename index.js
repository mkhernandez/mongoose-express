const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
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

// Middleware
// Body parser 
app.use(express.urlencoded({extended: true}));

// Method override so that we can use a put or patch request. Browsers will not let us use put, patch, or delete
// without using method-override. 
app.use(methodOverride('_method'));

// ROUTES 
// These will be moved eventually into their own file.
// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
    const products = await Product.find({});
    res.render("products/index", { products });
});

// GET new product form route
app.get('/products/new', (req, res) => {
    res.render("products/new");
});

// POST ROUTE to add a new product
app.post("/products", async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});

// GET ROUTE show details of one product
app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product });
});

// GET ROUTE update a product form
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
});

// PUT ROUTE update a product and add to db. Can use a post route and no method override instead
app.put("/products/:id", async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
});

app.listen(port, localhost, () => {
    log(`Listening on http://${localhost}: ${port}`);
});