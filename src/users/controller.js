const { Router } = require("express");
const UserModel = require("./model");
const bcrypt = require("bcryptjs");
const { SALT_BCRYPT, JWT_SECRET_KEY, JWT_EXPIRE_TIME } = require("../env");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const controller = (() => {
  const router = Router();

  router.post("/register", async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHashed = bcrypt.hashSync(password, SALT_BCRYPT);

      const user = await UserModel.create({
        ...req.body,
        password: passwordHashed,
      });

      res.status(200).json({
        type: "success",
        message: "User created successfuly.",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        const jwtContent = {
          username: user.username,
          email: user.email,
          expires: Date.now() + 60 * 60 * 1000,
        };

        const accessToken = jwt.sign(jwtContent, JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRE_TIME,
        });

        return res
          .status(200)
          .json({ token: accessToken, expire: JWT_EXPIRE_TIME });
      }

      res
        .status(403)
        .json({ type: "error", message: "Password or email was incorrect." });
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });

  router.get("/profile", passport.authenticate("jwt"), (req, res) => {
    const { user } = req;

    res.status(200).json(user);
  });

  router.get("/verify", passport.authenticate("jwt"), (req, res) => {
    const { user } = req;
    res.status(200).json(user);
  });

  return router;
})();

module.exports = controller;
