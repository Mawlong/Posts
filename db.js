const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/test';

mongoose.connect(url)
    .then(() => {
        console.log('Successfully connected');
        mongoose.disconnect();
    })
    .catch(() => {
        console.error('Failed to connect');
    })