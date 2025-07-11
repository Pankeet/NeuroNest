"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: { type: String },
});
const content = new mongoose_1.Schema({
    title: { type: String },
    link: { type: String, unique: true },
    description: { type: String },
    type: { type: String },
    //tags : {type : mongoose.Types.ObjectId , ref:'tags'},
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true }
});
const link = new mongoose_1.Schema({
    hash: { type: String },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'user', required: true, unique: true }
});
// const tags = new Schema({
//     title : String,
//     id : mongoose.Types.ObjectId
// })
exports.UserModel = (0, mongoose_1.model)('users', user);
exports.ContentModel = (0, mongoose_1.model)('content', content, 'content');
exports.LinkModel = (0, mongoose_1.model)('links', link);
//export const TagsModel = model("TagsModel" , tags);
