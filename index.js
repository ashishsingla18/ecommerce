const express = require("express");
const UserModel = require("./Models/UserSchema");
const mongoose = require('mongoose');
const ProductModel = require("./Models/Ecommerce/Product");
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await UserModel.create({
    name,
    email,
    password,
  });
  res.json('user created successfully!');
});

app.post('/products', async (req, res) => {
    await ProductModel.create({
        ...req.body
    })
    res.send('Product created successfully!')
});

app.get('/products', async (req, res) => {
    const products = await ProductModel.find();
    res.send(products);
});

// app.get('/product/:id', async (req, res) => {
//     console.log('DEBUG req', req);
//     const {id} = req.params;
//     const products = await ProductModel.findById(id);
//     res.send(products);
// });

app.get('/product', async (req, res) => {
    const productName = req.query.name;
    const product = await ProductModel.find({name: productName}).exec();
    console.log('DEBUG', product);
    res.send(product);
})

app.listen(4000);
