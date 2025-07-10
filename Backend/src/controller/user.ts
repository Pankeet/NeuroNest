import express , { Router } from 'express';
import { Request , Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose  from 'mongoose';
import bcrypt from 'bcrypt';
import { userJwt } from '../middleware/auth';
import { UserModel , ContentModel , LinkModel  } from '../model/db';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();
const app = express();
app.use(express.json());

const salt : number = Math.floor((Math.random() * 5)) + 8;

//Done
userRouter.post('/signup' , async (req:Request , res:Response) => {
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
            username : user.username,
            password : hashPassword,
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

//Done
userRouter.post('/signin' , async (req:Request, res:Response) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
        username :username,
    });

    if(user) {
        let checkPassword = await bcrypt.compare(password , user.password as string);
        if(checkPassword){
            const token = jwt.sign({
                id: user._id,
            } , process.env.JWT_SECRET as string, {expiresIn : '12h'});

            res.status(200).json({
                token  : token,
                message : " Sign in Successful"
            })
        }   else {
            res.status(401).json({
                message : "Invalid Credentials"
            })
        }
        return;
    }
    else{
        res.status(409).json({
            message : "User does not Exsists",
        })
        return;
    }
});

//Done
userRouter.post('/content' , userJwt , async (req:Request,res:Response) => {
    const title = req.body.title;
    const link = req.body.link;
    const description = req.body.description;

    const typeUrl = new URL(link);
    const type1 = typeUrl.hostname.split(".");
    const mainDomain = type1.length > 2 ? type1[1] : type1[0];
    try{
        const User = await ContentModel.create({
            title , link , description , userId : (req as any).userId
        });

        res.status(200).json({
            message : "Content Added Successfully",
            type_1 : mainDomain
        })
        return ;
    }   
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Error !"
        });
        return;
    }
});

// Testing 
userRouter.get('/content' , userJwt , async function (req:Request, res:Response):Promise<void> {

    try{
        const userContent = await ContentModel.find({
            userId : (req as any).userId
        })

        if(!userContent){
            res.status(401).json({
                message : "There is no Content here , Yet"
            })
            return ;    
        }   else{
            res.status(200).json({
                content : userContent
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Something went wrong !"
        });
        return ;
    }
});

// Comming Soon
userRouter.post('/share' , async (req, res) => {
    const userId = req.body.userId;
    const share = req.body.share;
    const hash = req.body.hash;
    if(share){
        await LinkModel.create({
            userId : userId ,
            hash : hash,
        })
    }
    else{
        await LinkModel.deleteOne({
            userId : userId
        })
    }
    
    res.status(200).json({
        message : "Upadated Shared Link"
    })

});

// Comming Soon
userRouter.get('/api/v1/brain/:shareLink' , async (req :Request, res:Response) => {
    const hash = req.params.shareLink;
    
    const link = await LinkModel.findOne({
        hash : hash,
    })
    
    if(!link) {
        res.status(411).json({
            message : "Link not found",
        })
        return ;
    }   else{
        const user = await UserModel.findOne({
            _id : link.userId
        })  ;
        
        if(!user){
            res.status(400).json({
                message : "User Not found , Ideally not possible"
            })
            return ;
        }   else{
            const userContent = await ContentModel.find({
                userId : user._id
            })
            
            res.status(200).json({
                user : user.username,
                content : userContent
            })
            return ;
        } 
    }
});

//Done
userRouter.delete('/remove-content/:link' , userJwt , async (req:Request , res:Response):Promise<void> => {

    const deleteContent = await ContentModel.deleteOne({
        link : req.params.link
    })
});

//Testing
userRouter.delete('/delete-account' , userJwt , async (req:Request , res : Response) => {
    try{
        const deleteAcc = await UserModel.deleteOne({ _id : (req as any).userId});
        try{
            const deleteContent = await ContentModel.deleteMany({userId : (req as any).userId})
            res.status(200).json({
                message : "Account Deleted Successfully"
            })
            return;
        }   catch(error){
            res.status(500).json({
                message : "Could not delete the related Contents of the user !"
            })
            return;
        }
    }
    catch(err){
        res.status(500).json({
            message : "Couldn't delete Account !"
        })
        return;
    }

});

export default userRouter;