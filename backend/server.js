const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const distanceRouter = require('./routes/distanceRouter.js');
const recordRouter = require('./routes/recordRouter.js');
const cityRouter = require('./routes/cityRouter.js');


dotenv.config();

const url = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.PASSWORD
).replace('<DATABASE>', process.env.DATABASE);

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Seeder Routes
app.use('/api/distanceSeeder', distanceRouter);
app.use('/api/city', cityRouter);

// Record Routes
app.use('/api/record', recordRouter);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
