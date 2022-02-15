const bcrypt = require('bcrypt');
const User = require('../models/User');
const path = require("path");
const { unlink } = require("fs");


exports.getUserController = async (req, res) => {

    try {
        const users = await User.find();
        res.render("users", {
            users: users
        })

    } catch (err) {
        next(err);
    }
};

//addUser
exports.addUser = async (req, res, next) => {
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashPassword
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashPassword
        })
    }

    //Save and send errors 
    try {
        const result = await newUser.save();
        res.status(200).json({
            message: "User was add successfull"
        })
    } catch (err) {

        res.status(500).json({
            errors: {
                common: {
                    msg: "Unkown error occured!!"
                }
            }
        })
    }
};


//@private 
//delete user 

exports.userRemove = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({
          _id: req.params.id,
        });
    
        // remove user avatar if any
        if (user.avatar) {
          unlink(
            path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
            (err) => {
              if (err) console.log(err);
            }
          );
        }
    
        res.status(200).json({
          message: "User was removed successfully!",
        });
      } catch (err) {
        res.status(500).json({
          errors: {
            common: {
              msg: "Could not delete the user!",
            },
          },
        });
      }
}