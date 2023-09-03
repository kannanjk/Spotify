import mongoose from "mongoose"

const Authschema  = mongoose.Schema({
    name:{
        type:String,
        require:['name require',true]
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    token:{
        type:String
    }
})

const auth = mongoose.model('users',Authschema)

export default auth