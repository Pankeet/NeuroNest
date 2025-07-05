"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJwt = userJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function userJwt(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(401).json({
            message: "Please login again"
        });
        return;
    }
    else {
        try {
            let decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (decodedToken) {
                req.userId = decodedToken.id;
                next();
            }
            else {
                res.status(401).json({
                    message: "Couldn't verify user"
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
}
