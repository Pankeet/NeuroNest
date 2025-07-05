"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
function hash(req, res, next) {
    let options = "qazwsxedcrfvtgb98765132";
    let len = options.length;
    const length = 16;
    var ans = "";
    for (let i = 0; i < length; i++) {
        ans += options[Math.floor((Math.random() * len))];
    }
    req.body.hash = ans;
    next();
}
