import bodyParser from 'body-parser';
import express from 'express';
import order from './routes/api/order';
import catalog from './routes/api/catalog';
import contact from './routes/api/contact';
import instagram from './routes/api/instagram';
import cors from 'cors';

const app = express();

// cors config
const corsWhitelist = [
  'http://localhost',
  'https://sonrisa-server.herokuapp.com',
  'https://wizardly-jepsen-70e852.netlify.app',
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

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
