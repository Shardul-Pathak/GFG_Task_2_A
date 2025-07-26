import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { connectDB, collection } from '../src/db/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import pageRoutes from '../src/routes/pages.js';

app.post('/admin', async (req, res) => {
  const data = {
    productName: req.body.names,
    imageURL: req.body.url,
    price: req.body.price,
    description: req.body.description
  }
  const existingProduct = await collection.findOne({ productName: data.productName });
  if (existingProduct) {
    return res.send('Product already exists');
  }
  else {
    await collection.insertOne(data);
    res.redirect('/');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await collection.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
});

app.use('/', pageRoutes);

export default app;