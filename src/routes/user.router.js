const { Router } = require("express");
const {
  GetUserById,
  CreateNewUser,
  LoginUser,
} = require("../controllers/user.controller");
const {
  userRegistrationValidationRules,
  userLoginValidationRules,
} = require("../validators/userValidations");
const validate = require("../middlewares/validate");

const router = Router();

router.post("/login", userLoginValidationRules, validate, LoginUser);
router.post(
  "/register",
  userRegistrationValidationRules,
  validate,
  CreateNewUser
);
router.get("/:id", GetUserById);

module.exports = router;
