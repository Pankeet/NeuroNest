import { Request , Response , NextFunction } from "express";

export function hash(req: Request , res:Response , next:NextFunction){
    let options = "qazwsxedcrfvtgb98765132";
    let len = options.length;
    const length = 16;
    var ans = "";

    for(let i=0;i<length;i++){
        ans+=options[Math.floor((Math.random() * len))];
    }

    req.body.hash = ans;
    next();
}