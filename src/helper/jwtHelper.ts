import jwt, {JwtPayload, Secret, SignOptions} from "jsonwebtoken";

// Generete token
const generateToken= (payload: any, secret: Secret, expireTime: string) => {
     const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expireTime
     } as SignOptions
    ); 
    return token

}

// verify token 
const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}

// decode token 
const decodeToken = (token: string) => {
    return jwt.decode(token)
}
export const jwtHelper = {
    generateToken,
    verifyToken,
    decodeToken
}