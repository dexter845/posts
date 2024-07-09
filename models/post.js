const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  }
}, { collection: 'posts' });

postSchema.plugin(AutoIncrement, { inc_field: 'postId' });

module.exports = mongoose.model('Post', postSchema);