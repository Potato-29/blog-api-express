const { default: mongoose } = require("mongoose");
const blogSchema = require("../schemas/blog.schema");

const Blog = new mongoose.model("blog", blogSchema);

module.exports = Blog;
