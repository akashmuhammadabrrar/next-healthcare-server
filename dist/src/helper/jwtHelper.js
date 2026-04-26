import jwt from "jsonwebtoken";
// Generete token
const generateToken = (payload, secret, expireTime) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expireTime
    });
    return token;
};
// verify token 
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
// decode token 
const decodeToken = (token) => {
    return jwt.decode(token);
};
export const jwtHelper = {
    generateToken,
    verifyToken,
    decodeToken
};
