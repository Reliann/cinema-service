const mongooseDB = require('mongoose')

// to remove the annoying __v
function omit_v(doc, obj) {
    delete obj.__v;
    return obj;
}
// From EVERYTHING I CAN
var options = {
    toJSON: {
        transform: omit_v
    },
    toObject: {
        transform: omit_v
    }
}

const userModel = new mongooseDB.Schema({
    username:String,
    password:String
}, options)

module.exports= mongooseDB.model('users',userModel)