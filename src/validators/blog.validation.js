const { body, param, query } = require("express-validator");

const postBlogValidationRules = [
  body("title").notEmpty().withMessage("The blog needs a title!"),
  body("content").notEmpty().withMessage("The blog needs some content!"),
  body("author").notEmpty().withMessage("The author can't be empty!"),
  body("tags").notEmpty().withMessage("The blog needs some tags!"),
];

const deleteBlogValidationRules = [
  param("id").notEmpty().withMessage("Blog Id required to delete!"),
];

const updateBlogValidationRules = [
  param("id").notEmpty().withMessage("Blog Id required to update!"),
];

const fetchBlogValidationRules = [
  param("id").notEmpty().withMessage("Blog id cannot be null!"),
];

const searchBlogValidationRules = [
  query("title").optional().isString().withMessage("Title must be a string"),
  query("author").optional().isString().withMessage("Author must be a string"),
  query("tags")
    .optional()
    .custom((value) => {
      if (!Array.isArray(value.split(","))) {
        throw new Error("Tags must be a comma-separated list of strings");
      }
      return true;
    }),
];
module.exports = {
  searchBlogValidationRules,
  postBlogValidationRules,
  deleteBlogValidationRules,
  updateBlogValidationRules,
  fetchBlogValidationRules,
};
