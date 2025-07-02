"use strict";
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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const salt = 9;
(0, config_1.connectDb)();
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            name: user.name,
            age: user.age,
            phoneNumber: user.phone
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
app.post('api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const user = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
        }, jwt_secret);
        res.status(200).json({
            token: token,
            message: " Sign in Successful"
        });
        return;
    }
}));
app.post('/api/v1/content', (req, res) => {
    const title = req.body.title;
    const link = req.body.link;
});
app.get('api/v1/content', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
app.delete('api/v1/content', (req, res) => {
});
app.post('api/v1/brain/share', (req, res) => {
});
app.get('api/v1/brain/:shareLink', (req, res) => {
});
app.listen(3000);
