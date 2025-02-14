const blogModel = require("../models/blog.model");

const getAllBlogs = async (page, limit, offset) => {
  return await blogModel.find().skip(offset).limit(limit);
};

const getBlogById = async (id) => {
  return await blogModel.findById(id);
};

const createBlog = async (data) => {
  const newblog = new blogModel(data);
  return await newblog.save();
};

const updateBlog = async (id, data) => {
  return await blogModel.findByIdAndUpdate(id, data, { new: true });
};

const removeBlog = async (id) => {
  return await blogModel.findByIdAndDelete(id);
};

const findBlogByQuery = async (query) => {
  console.log("query", query);
  return await blogModel.find(query);
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  removeBlog,
  findBlogByQuery,
};
