const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');



exports.getloginController = async (req, res) => {
    res.render("index", {
        title: "Chat-Applications"
    })
};


exports.login = async (req, res, next) => {

    try {
        // find a user who has this email/username
        const user = await User.findOne({
          $or: [{ email: req.body.username }, { mobile: req.body.username }],
        });
    
        if (user && user._id) {
          const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
    
          if (isValidPassword) {
            // prepare the user object to generate token
            const userObject = {
              username: user.name,
              mobile: user.mobile,
              email: user.email,
              role: "user",
            };
    
            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRY,
            });
    
            // set cookie
            res.cookie(process.env.COOKIE_NAME, token, {
              maxAge: process.env.JWT_EXPIRY,
              httpOnly: true,
              signed: true,
            });
    
            // set logged in user local identifier
            res.locals.loggedInUser = userObject;
    
            res.render("inbox");
          } else {
            throw createError("Login failed! Please try again.");
          }
        } else {
          throw createError("Login failed! Please try again.");
        }
      } catch (err) {
        res.render("index", {
          data: {
            username: req.body.username,
          },
          errors: {
            common: {
              msg: err.message,
            },
          },
        });
      }

};


exports.logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logout");
}