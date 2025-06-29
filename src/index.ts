import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from './db';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());

const salt = 9;
const JWT_SECRET = "NeuroNest1029384756"

app.post('/api/v1/signup' , async (req , res): Promise<void> => {
    // user.phone
    const user = req.body;
    try{
        const UserExsists = await UserModel.findOne({username : user.username});
        if(UserExsists){
            res.status(411).json({
                message : "User Already Exsists"
            })
            return ;
        }
        const hashPassword = await bcrypt.hash(user.password , salt);
        await UserModel.create({
            user: user.username,
            password : hashPassword,
            name: user.name,
            age: user.age,
            phoneNumber: user.phone
        })

        res.status(200).json({
            message : "SignUp Successful"
        })
        return;
    }
    catch(err){
        console.log(err);
    }
});

app.post('api/v1/signin' , async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username :username,
        password : password
    });

    if(user) {
        const token = jwt.sign({
            id: user._id,
        } , JWT_SECRET);

        res.status(200).json({
            token  : token,
            message : " Sign in Successful"
        })
        return;
    }
});

app.post('/api/v1/content' , (req,res) => {

});

app.get('api/v1/content' , (req, res) => {

});

app.delete('api/v1/content' , (req , res) => {

});

app.post('api/v1/brain/share' , (req, res) => {

});

app.get('api/v1/brain/:shareLink' , (req, res) => {

});



   
   

 