const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const commentsRoute = require('./routes/comments');
const app = express();

const url = 'mongodb://localhost:27017/test';

app.use(express.static('public'));

mongoose.connect(url)
  .then(function() {
    app.use(bodyParser.json());

    app.use('/comments', commentsRoute);

    app.listen(3000, 'localhost', function(err) {
      if (!err) {
        console.log('Server running on localhost:3000')
      }
    });
  })

  .catch(function() {
    console.error('Kaboom!')
    process.exit();
  })
