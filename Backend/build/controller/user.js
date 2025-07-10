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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middleware/auth");
const db_1 = require("../model/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userRouter = (0, express_1.Router)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const salt = Math.floor((Math.random() * 5)) + 8;
//Done
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // user.phone
    const user = req.body;
    try {
        const UserExsists = yield db_1.UserModel.findOne({ username: user.username });
        if (UserExsists) {
            res.status(411).json({
                message: "User Already Exsists"
            });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(user.password, salt);
        yield db_1.UserModel.create({
            username: user.username,
            password: hashPassword,
        });
        res.status(200).json({
            message: "SignUp Successful"
        });
        return;
    }
    catch (err) {
        console.log(err);
    }
}));
//Done
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield db_1.UserModel.findOne({
        username: username,
    });
    if (user) {
        let checkPassword = yield bcrypt_1.default.compare(password, user.password);
        if (checkPassword) {
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
            }, process.env.JWT_SECRET, { expiresIn: '12h' });
            res.status(200).json({
                token: token,
                message: " Sign in Successful"
            });
        }
        else {
            res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        return;
    }
    else {
        res.status(409).json({
            message: "User does not Exsists",
        });
        return;
    }
}));
//Done
userRouter.post('/content', auth_1.userJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const description = req.body.description;
    const typeUrl = new URL(link);
    const type1 = typeUrl.hostname.split(".");
    const mainDomain = type1.length > 2 ? type1[1] : type1[0];
    try {
        const User = yield db_1.ContentModel.create({
            title, link, description, userId: req.userId
        });
        res.status(200).json({
            message: "Content Added Successfully",
            type_1: mainDomain
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error !"
        });
        return;
    }
}));
// Testing 
userRouter.get('/content', auth_1.userJwt, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userContent = yield db_1.ContentModel.find({
                userId: req.userId
            });
            if (!userContent) {
                res.status(401).json({
                    message: "There is no Content here , Yet"
                });
                return;
            }
            else {
                res.status(200).json({
                    content: userContent
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Something went wrong !"
            });
            return;
        }
    });
});
// Comming Soon
userRouter.post('/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const share = req.body.share;
    const hash = req.body.hash;
    if (share) {
        yield db_1.LinkModel.create({
            userId: userId,
            hash: hash,
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: userId
        });
    }
    res.status(200).json({
        message: "Upadated Shared Link"
    });
}));
// Comming Soon
userRouter.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: hash,
    });
    if (!link) {
        res.status(411).json({
            message: "Link not found",
        });
        return;
    }
    else {
        const user = yield db_1.UserModel.findOne({
            _id: link.userId
        });
        if (!user) {
            res.status(400).json({
                message: "User Not found , Ideally not possible"
            });
            return;
        }
        else {
            const userContent = yield db_1.ContentModel.find({
                userId: user._id
            });
            res.status(200).json({
                user: user.username,
                content: userContent
            });
            return;
        }
    }
}));
//Done
userRouter.delete('/remove-content/:link', auth_1.userJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteContent = yield db_1.ContentModel.deleteOne({
        link: req.params.link
    });
}));
//Testing
userRouter.delete('/delete-account', auth_1.userJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAcc = yield db_1.UserModel.deleteOne({ _id: req.userId });
        try {
            const deleteContent = yield db_1.ContentModel.deleteMany({ userId: req.userId });
            res.status(200).json({
                message: "Account Deleted Successfully"
            });
            return;
        }
        catch (error) {
            res.status(500).json({
                message: "Could not delete the related Contents of the user !"
            });
            return;
        }
    }
    catch (err) {
        res.status(500).json({
            message: "Couldn't delete Account !"
        });
        return;
    }
}));
exports.default = userRouter;
