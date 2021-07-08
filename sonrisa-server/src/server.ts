import bodyParser from 'body-parser';
import express from 'express';
import connectDB from '../config/database';
import auth from './routes/api/auth';
import order from './routes/api/order';
import profile from './routes/api/profile';
import user from './routes/api/user';
import catalog from './routes/api/catalog';
import contact from './routes/api/contact';
import instagram from './routes/api/instagram';

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

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/profile', profile);
app.use('/api/order', order);
app.use('/api/catalog', catalog);
app.use('/api/contact', contact);
app.use('/api/instagram', instagram);

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
