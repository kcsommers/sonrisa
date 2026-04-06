const mongoose = require('mongoose');
import env from '../environment';

export const connectToMongoDb = () => {
  const dbUri = env.MONGODB_URI;
  mongoose.connect(dbUri);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('Connected to DB');
  });
  connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );
};
