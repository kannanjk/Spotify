import mongoose from "mongoose"
import crypto from 'crypto'

const Authschema = new mongoose.Schema({
    name: {
        type: String,
        require: ['name require', true]
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire:String
    
})

Authschema.methods.getResetPasswordToken = () => {
    // generating token
    const Token = crypto.randomBytes(20).toString('hex')
    return Token
}

const auth = mongoose.model('users', Authschema)

export default auth