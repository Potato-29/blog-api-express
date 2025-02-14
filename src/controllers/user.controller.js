const responseHelper = require("../helpers/http-responses");
const hashPassword = require("../helpers/password-hasher");
const {
  getUser,
  getUserByEmail,
  registerUser,
} = require("../services/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  GetUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await getUser(id);

      const { name, email, created_at, _id } = user;
      const userInfo = {
        name,
        email,
        created_at,
        id: _id,
      };
      if (user) {
        responseHelper.success(res, "User found!", userInfo);
        return;
      }
    } catch (error) {
      next(error);
    }
  },
  LoginUser: async (req, res, next) => {
    try {
      const user = await getUserByEmail(req.body.email);

      if (!user) {
        responseHelper.notFound(res, "User not found!", null);
        return;
      }

      const isPasswordValid = bcrypt.compareSync(
        req.body?.password,
        user.password
      );

      if (isPasswordValid) {
        const { email, name, created_at, _id } = user;
        let userInfo = {
          email,
          name,
          created_at,
          _id,
        };
        let token = jwt.sign(userInfo, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        responseHelper.success(res, "Login successful!", token);
        return;
      }

      return responseHelper.forbidden(res, "Invalid Password!", null);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  CreateNewUser: async (req, res, next) => {
    try {
      const existingUser = await getUserByEmail(req.body.email);
      if (existingUser) {
        responseHelper.badRequest(res, "User by that email already exists", {
          name: existingUser.name,
          email: existingUser.email,
        });
        return;
      }

      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const user = await registerUser(req.body);
      if (user) {
        responseHelper.created(res, "User registered successfully", {
          name: user.name,
          email: user.email,
        });
        return;
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
