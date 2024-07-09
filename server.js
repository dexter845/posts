const express = require('express');
const app = express();
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')
const notFound = require('./middleware/notFound');
const mongoose = require('mongoose');


const uri = process.env.connection_string;
mongoose.connect(uri, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger)


const path = require('path');

const posts = require('./routes/posts');
const { error } = require('console');
 
// static setup
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log('server running on port', port)
})

app.use('/api/posts', posts);

app.use(notFound)

app.use(errorHandler);