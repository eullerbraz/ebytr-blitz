const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 3000, DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = require('./app');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
