import mongoose, { model , mongo, Schema } from 'mongoose';

const user = new Schema({
    username : {type: String , unique: true },
    password : {type: String },
    name : {type: String },
    age : Number,
    phoneNumber : Number
})

const content = new Schema({
    title : {type :String },
    link : { type : String , unique : true},
    description : { type : String},
    //tags : {type : mongoose.Types.ObjectId , ref:'tags'},
    userId : {type : mongoose.Types.ObjectId , ref:'user' , required : true}
}) 

const link = new Schema({
    hash : {type :String },
    userId : { type : mongoose.Types.ObjectId , ref :'user' , required : true , unique : true}
}) 

// const tags = new Schema({
//     title : String,
//     id : mongoose.Types.ObjectId
// })

export const UserModel = model('users' , user);
export const ContentModel = model('content', content , 'content');
export const LinkModel = model('links' , link);
//export const TagsModel = model("TagsModel" , tags);
