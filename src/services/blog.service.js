const blogModel = require("../models/blog.model");

const getAllBlogs = async () => {
  return await blogModel.find();
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

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  removeBlog,
};
