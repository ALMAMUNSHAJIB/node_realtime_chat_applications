const {check, validationResult} = require('express-validator');


const doLoginCheck = [
    check("username")
      .isLength({min: 3})
      .withMessage("Mobile number or email required"),
    check("password")
      .isLength({min: 8})
      .withMessage("Password is required")

];

const doLoginValidatorHandler = function(req, res, next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        res.render("index", {
            data: {
                username: req.body.username
            },
            errors: mappedErrors
        })
    }
}



module.exports = {
    doLoginCheck,
    doLoginValidatorHandler
}