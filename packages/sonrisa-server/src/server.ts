import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import {
  authController,
  catalogRouter,
  contactRouter,
  instagramRouter,
  orderingRouter,
  eventsController,
} from './controllers';
import { connectToMongoDb } from './database';

const app = express();

// cors config
const corsWhitelist = [
  'http://localhost:3000',
  'https://sonrisa-server.herokuapp.com',
  'https://wizardly-jepsen-70e852.netlify.app',
  'https://sonrisadonuts.com',
  'https://www.sonrisadonuts.com',
];
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('origin error:::: ', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// Express configuration
app.set('port', process.env.PORT || 5001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('API Running');
});

app.use('/api/order', orderingRouter);
app.use('/api/catalog', catalogRouter);
app.use('/api/contact', contactRouter);
app.use('/api/instagram', instagramRouter);
app.use('/api/auth', authController);
app.use('/api/events', eventsController);

connectToMongoDb();

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
