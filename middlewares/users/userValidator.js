const {check, validationResult} = require('express-validator');
const createError = require('http-errors');
const User = require('../../models/User');
const path = require("path");
const {unlink} = require("fs");

const addUserValidator = [
       check("name")
          .isLength({min: 3})
          .withMessage("Name is required")
          .isAlpha('en-US', {ignore: " -"})
          .withMessage("Name must contain anything other than alphabet")
          .trim(),

        check("email")
           .isEmail()
           .withMessage("Invalid email address")
           .trim()
           .custom(async(value) => {
               try{
                   const user = await User.findOne({email: value});
                   if(user){
                       throw createError("Email already is used!");
                   }

               }catch(err){
                 throw createError(err.message);
               }
           }),
        check("mobile")
            .isMobilePhone('bn-BD')
            .withMessage("Moblie number must be Bangladeshi"),
        check("password")
          .isStrongPassword({minLength: 8})
          .withMessage("Password must be contain 8 character 1 lowecrcase 1 uppercase  1 number & 1 symbol ")
];


const addUserValidatorHandler = (req, res, next) => {
        const errors = validationResult(req);
        const mappedErrors = errors.mapped();
        if(Object.keys(mappedErrors).length === 0){
            next();
        }else{
            //remove upload files
           if(req.files.length > 0){
               const {filename} = req.files[0];
               unlink(
                   path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                   (err)=>{
                       if(err) console.log(err);
                   }
               )
           }
           //response errors
           res.status(500).json({
               errors: mappedErrors
           })
        }
}


module.exports = {
    addUserValidator,
    addUserValidatorHandler
}