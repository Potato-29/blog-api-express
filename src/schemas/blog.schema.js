const { default: mongoose, mongo } = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
  comments: [Object],
  reads: Number,
});

module.exports = blogSchema;
