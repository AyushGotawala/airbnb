const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    favourites : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Home'
    }]
});

module.exports = mongoose.model('User',userSchema);