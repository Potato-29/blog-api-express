const express = require("express");
const router = express.Router();
const {
  ListAllBlogs,
  GetBlog,
  CreateBlog,
  UpdateBlogData,
  DeleteBlog,
} = require("../controllers/blog.controller");

router.get("/", ListAllBlogs);
router.get("/:id", GetBlog);
router.post("/", CreateBlog);
router.put("/:id", UpdateBlogData);
router.delete("/:id", DeleteBlog);

module.exports = router;
