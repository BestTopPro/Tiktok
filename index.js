const express = require('express');
const bodyparser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const { urlencoded } = require('express');

const app = express();


// Connect Database
connectDB();

//cors
app.use(cors())

// Init Middleware
app.use(express.json());

app.use(bodyparser.urlencoded({extended: true}))

app.use('/' , require('./routes/index'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
