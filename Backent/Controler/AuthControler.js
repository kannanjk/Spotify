import express from 'express'
import AuthControler from '../Models/AuthModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../Utils/SendEmail.js'
import crypto from 'crypto'
import auth from '../Models/AuthModel.js'

const app = express()

export const register = async (req, res) => {
  console.log('kannan');
  const ath = new AuthControler(req.body)
  const { email, password } = req.body
  const pass = await bcrypt.hash(password, 10)
  ath.password = pass
  const newUser = await AuthControler.findOne({ email })
  if (newUser) {
    res.send({
      success: false,
      message: "User alredy exixt"
    })
  } else {
    const user = await ath.save()
    const token = jwt.sign({ _id: user._id, email },
      process.env.TOKEN, { expiresIn: "1d" }
    )
    user.token = token
    console.log(user);
    res.send({
      success: true,
      user: user,
    })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await AuthControler.findOne({ email })
  if (user) {
    const pass = await bcrypt.compare(password, user.password)
    if (pass) {
      const token = jwt.sign({ _id: user._id, email },
        process.env.TOKEN, { expiresIn: "1d" }
      )
      user.token = token
      res.send({
        success: true,
        user: user,
        message: 'login success'
      })
    } else {
      console.log("user name or pass incorrect");
      res.send({
        success: false,
        message: 'User not fount'
      })
    }
  } else {
    res.send({
      message: 'user not fount'
    })
  }
}

export const getUser = async (req, res) => {
  const userId = req.body.userId
  const user = await AuthControler.findOne({ _id: userId._id })
  if (user) {
    res.send({
      success: true,
      message: "user found",
      user: user
    })
  }
}

export const forgotpass = async (req, res) => {

  const { email } = req.body

  const user = await auth.findOne({ email })
  const resetToken = crypto.randomBytes(20).toString('hex')
  console.log(resetToken);

  // Hashing and adding resetPasswordToken to userSchema
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordExpire = Date.now() + 15 ;
  user.save()
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const transporter =  sendEmail({email}) 
}

export const resetpass = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    console.log(resetPasswordToken);
  const user = await auth.findOne( {resetPasswordToken,resetPasswordExpire: { $gt: Date.now()}})
  console.log(user);
  if (user) {
    if (req.body.password == req.body.conPassword) {
      const pass = await bcrypt.hash(req.body.password, 10)
      user.password = pass
      user.save()
    } else {
      console.log("eneter same password");
    }
  }
}