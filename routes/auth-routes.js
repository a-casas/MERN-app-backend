// routes/auth-routes.js

const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

// require the user model !!!!
const User = require("../models/User");

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  if (!username || !password) {
    // res.status(400)
    res.json({ message: "Provide username and password" });
    return;
  }

  if (password.length < 7) {
    res
      // .status(400)
      .json({
        message:
          "Please make your password at least 8 characters long for security purposes.",
      });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res.json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass,
    });

    aNewUser.save((err) => {
      if (err) {
        res.json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      req.login(aNewUser, (err) => {
        if (err) {
          res.json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        res.status(200).json(aNewUser);
      });
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.json({ message: "Error authenticating user" });
      return;
    }
    if (!theUser) {
      res.json(failureDetails);
      return;
    }
    req.login(theUser, (err) =>
      err
        ? res.json({ message: "Session error" })
        : res.status(200).json(theUser)
    );
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.json({});
});

module.exports = authRoutes;
