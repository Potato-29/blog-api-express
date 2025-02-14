const express = require("express");
const router = express.Router();
const {
  ListAllBlogs,
  GetBlog,
  CreateBlog,
  UpdateBlogData,
  SearchBlog,
  DeleteBlog,
} = require("../controllers/blog.controller");
const {
  fetchBlogValidationRules,
  postBlogValidationRules,
  updateBlogValidationRules,
  deleteBlogValidationRules,
} = require("../validators/blog.validation");
const validate = require("../middlewares/validate");
const validateToken = require("../middlewares/auth-guard");

router.get("/", ListAllBlogs);
router.get("/search", SearchBlog); // auth guard
router.get("/:id", fetchBlogValidationRules, validate, GetBlog);
router.post("/", postBlogValidationRules, validate, CreateBlog); //auth guard
router.put("/:id", updateBlogValidationRules, validate, UpdateBlogData); //auth guard
router.delete("/:id", deleteBlogValidationRules, validate, DeleteBlog); //auth guard

module.exports = router;
