import { NextFunction,Request, Response } from "express"
import { jwtHelper } from "../../helper/jwtHelper"
import config from "../../config"
import APIError from "../errors/Api.errors"
import httpStatus from "http-status"

const auth = (...roles: string[]) => {
    return async (req: Request & {user?: any}, res: Response, next: NextFunction) => {
        try{
            const token = req.cookies.accessToken
            if(!token){
                throw new APIError(httpStatus.BAD_REQUEST, "you are not ")
            }
            // verify token 
            const verifyUser = jwtHelper.verifyToken(token, config.jwt.access_secret as string);
            req.user = verifyUser;
            if(roles.length && !roles.includes(verifyUser.role)){
                throw new APIError(httpStatus.BAD_REQUEST, "you are not authorized!")
            }
            next();
        }catch(error){
            next(error)
        }
     }
}

export default auth;