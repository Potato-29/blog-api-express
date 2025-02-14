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
router.get("/search", SearchBlog);
router.get("/:id", fetchBlogValidationRules, validate, GetBlog);
router.post("/", validateToken, postBlogValidationRules, validate, CreateBlog);
router.put(
  "/:id",
  validateToken,
  updateBlogValidationRules,
  validate,
  UpdateBlogData
);
router.delete(
  "/:id",
  validateToken,
  deleteBlogValidationRules,
  validate,
  DeleteBlog
);

module.exports = router;
