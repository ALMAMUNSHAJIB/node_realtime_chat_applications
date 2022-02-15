const {Schema, model, Types} = require("mongoose");

const conversationSchema = Schema({

    creator:{
        id: Types.ObjectId,
        name: String,
        avatar: String
    },
    participant: {
        id: Types.ObjectId,
        name: String,
        avatar: String

    },
    last_updated: {
        type: Date,
        default: Date.now,
    
    }

},  {
    timestamps: true
});


const Coversation = model('Conversation', conversationSchema);
module.exports = Coversation;