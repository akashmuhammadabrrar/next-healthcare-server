import jwt, {Secret, SignOptions} from "jsonwebtoken";

const generateToken= (payload: any, secret: Secret, expireTime: string) => {
     const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expireTime
     } as SignOptions
    ); 
    return token

}
export const jwtHelper = {
    generateToken
}