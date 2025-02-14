const responseHelper = require("../helpers/http-responses");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  removeBlog,
  findBlogByQuery,
} = require("../services/blog.service");
const blogModel = require("../models/blog.model");

module.exports = {
  ListAllBlogs: async (req, res, next) => {
    try {
      const { page, limit } = req.query;
      const offset = (page - 1) * limit;
      const blogs = await getAllBlogs(page, limit, offset);
      const totalBlogs = await blogModel.countDocuments();
      if (blogs) {
        responseHelper.success(res, "Success", {
          page,
          limit,
          totalBlogs,
          totalPages: Math.ceil(totalBlogs / limit),
          blogs,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  GetBlog: async (req, res, next) => {
    try {
      const id = req.params.id;
      const blog = await getBlogById(id);

      if (!blog) {
        responseHelper.notFound(res, "Blog not found", null);
        return;
      }

      responseHelper.success(res, "Success", blog);
    } catch (error) {
      next(error);
    }
  },

  CreateBlog: async (req, res, next) => {
    try {
      const blog = await createBlog(req.body);
      if (blog) {
        responseHelper.created(res, "Created successfully", blog);
      }
    } catch (error) {
      next(error);
    }
  },

  UpdateBlogData: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updatedBlog = await updateBlog(id, req.body);
      console.log(updatedBlog);
      responseHelper.success(res, "Updated successfully", null);
    } catch (error) {
      next(error);
    }
  },

  DeleteBlog: async (req, res, next) => {
    try {
      const id = req.params.id;
      const removedBlog = await removeBlog(id);
      if (removedBlog) {
        responseHelper.success(res, "Deleted successfully", null);
      }
    } catch (error) {
      next(error);
    }
  },

  SearchBlog: async (req, res, next) => {
    try {
      const { title, tags, author } = req.query;
      const payload = {};

      if (title !== undefined && title !== "") {
        payload.title = { $regex: title, $options: "i" };
      }
      if (tags !== undefined && tags !== "") {
        payload.tags = { $in: tags.split(",") };
      }
      if (author !== undefined && author !== "") {
        payload.author = { $regex: author, $options: "i" };
      }

      const blogs = await findBlogByQuery(payload);
      if (blogs) {
        responseHelper.success(res, "Found items!", blogs);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
