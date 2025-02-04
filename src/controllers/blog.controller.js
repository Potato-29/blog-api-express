const responseHelper = require("../helpers/http-responses");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  removeBlog,
} = require("../services/blog.service");

module.exports = {
  ListAllBlogs: async (req, res, next) => {
    try {
      const blogs = await getAllBlogs();
      if (blogs) {
        responseHelper.success(res, "Success", blogs);
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
};
