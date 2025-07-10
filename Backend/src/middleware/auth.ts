import { Request , Response , NextFunction } from "express";
import { UserModel } from "../model/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export function userJwt(req:Request, res:Response , next : NextFunction){
    const token = req.headers.authorization as string;
    if(!token){
        res.status(401).json({
        message : "Please login again"
        })
        return;
    }   
    else{
        try{
            let decodedToken = jwt.verify(token , process.env.JWT_SECRET as string) as JwtPayload;
            if(decodedToken){
                (req as any).userId = decodedToken.id;
                next();
            }
            else{
                res.status(401).json({
                    message : "Couldn't verify user"
                })
                return;
            }
        }
        catch(error){
            console.log(error);
            return;
        }
    }
}