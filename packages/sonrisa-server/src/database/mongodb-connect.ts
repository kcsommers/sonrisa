const mongoose = require('mongoose');

export const connectToMongoDb = () => {
  const dbUri = process.env.MONGODB_URI;
  mongoose.connect(dbUri);
  const connection = mongoose.connection;
  console.log('db:::: ', dbUri);
  connection.once('open', () => {
    console.log('Connected to DB');
  });
  connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );
};
