import express from 'express'
import mongoose from 'mongoose'
import AuthControler from '../Models/AuthModel.js'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
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
        const token = jwt.sign({_id: user._id, email},
            process.env.TOKEN,{expiresIn:"1d"}
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
            const token = jwt.sign({_id: user._id, email},
                process.env.TOKEN,{expiresIn:"1d"}
                )
                user.token= token
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

export const getUser = async (req,res)=>{
    const userId = req.body.userId
    const user = await AuthControler.findOne({ _id:userId._id })
    if (user) {
        res.send({
            success:true,
            message:"user found",
            user:user
        })
    }
}