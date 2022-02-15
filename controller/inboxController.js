const User = require('../models/User');
const Conversation = require('../models/Conversations');


exports.getInboxController = async(req, res) => {
    try{
        const conversations = await Conversation.find({
            $or: [
                {"creator.id": req.user.userid},
                {"participant.id": req.user.userid}
            ]
        });
        res.loclas.data = conversations;
        res.render("inbox");
    }catch(err){
        next(err);

    }
 };

 //search user 

 exports.searchUser = async(req, res,next) =>{
     const escape = replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
     const user = req.body.user;
     const searchQuery = user.replace("+88", "");
     

 }
