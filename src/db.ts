import { model , Schema } from 'mongoose';

const user = new Schema({
    username : {type: String , unique: true },
    password : {type: String },
    name : {type: String },
    age : Number,
    phoneNumber : Number
})

export const UserModel = model('UserModel' , user);
