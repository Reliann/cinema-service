const mongoose = require('mongoose')

//ODM 

/*mongoose.connect("mongodb://localhost:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})*/
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})  