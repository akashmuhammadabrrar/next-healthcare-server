import jwt from "jsonwebtoken";
const generateToken = (payload, secret, expireTime) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: expireTime
    });
    return token;
};
export const jwtHelper = {
    generateToken
};
