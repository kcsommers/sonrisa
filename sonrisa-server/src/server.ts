import bodyParser from 'body-parser';
import express from 'express';
import order from './routes/api/order';
import catalog from './routes/api/catalog';
import contact from './routes/api/contact';
import instagram from './routes/api/instagram';

const app = express();

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

app.use('/api/order', order);
app.use('/api/catalog', catalog);
app.use('/api/contact', contact);
app.use('/api/instagram', instagram);

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
