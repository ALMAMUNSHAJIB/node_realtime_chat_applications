const uploader = require('../../utilites/signalUploader');
exports.avatarUploade = (req, res, next) => {
    const upload = uploader(
        "avatars",
        ["image/jpeg", "image/jpg", "image/png"],
        1000000,
        "Only jeg, jpeg & png allowed!"

    );

    //call middelwaer function 
    upload.any()(req, res, (err) => {
        if(err){
            res.status(500).json({
               errors: {
                  avatar: {
                     message: err.message,
                  }
               } 
            })
        }else{
           next();
        }
    });
};


