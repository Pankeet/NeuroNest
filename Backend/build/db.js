"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const user = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    name: { type: String },
    age: Number,
    phoneNumber: Number
});
exports.UserModel = (0, mongoose_1.model)('UserModel', user);
