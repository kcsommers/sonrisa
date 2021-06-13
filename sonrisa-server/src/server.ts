import bodyParser from 'body-parser';
import express from 'express';
import connectDB from '../config/database';
import auth from './routes/api/auth';
import order from './routes/api/order';
import profile from './routes/api/profile';
import user from './routes/api/user';
import menu from './routes/api/menu';

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('API Running');
});

app.get('/api/seed', async (req, res) => {
  // const items = await OrderableItem.insertMany([
  //   {
  //     name: 'Vanilla Custard',
  //     description: 'Vanilla beans with Local WA Dairy',
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520110/Sonrisa/vanilla-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520109/Sonrisa/vanilla-1.jpg',
  //     ],
  //   },
  //   {
  //     name: 'Mulberry Matcha',
  //     description: 'Mulberry green tea latte',
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520110/Sonrisa/vanilla-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520109/Sonrisa/vanilla-1.jpg',
  //     ],
  //   },
  //   {
  //     name: 'Mulberry Matcha',
  //     description: 'Mulberry green tea latte',
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520105/Sonrisa/matcha-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520103/Sonrisa/matcha-1.jpg',
  //     ],
  //   },
  //   {
  //     name: "Fran's Nutella",
  //     description: "Fran's Chocolate made in Seattle with Nutella",
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520102/Sonrisa/nutella-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520101/Sonrisa/nutella-1.jpg',
  //     ],
  //   },
  //   {
  //     name: 'Thai Milk Tea',
  //     description: 'Original Thai milk tea blended with Ceylon tea',
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520107/Sonrisa/thai-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520107/Sonrisa/thai-1.jpg',
  //     ],
  //   },
  //   {
  //     name: 'Strawberry Cream Cheese',
  //     description: 'Housemade strawberry jam',
  //     price: 425,
  //     outOfStock: false,
  //     images: [
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520104/Sonrisa/strawberry-transparent.png',
  //       'https://res.cloudinary.com/kcsommers/image/upload/v1623520102/Sonrisa/strawberry-1.jpg',
  //     ],
  //   },
  // ]);
  res.send(':::: SEEDING ::::');
});

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/order', order);
app.use('/api/menu', menu);

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
