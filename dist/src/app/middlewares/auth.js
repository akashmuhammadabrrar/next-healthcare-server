import { jwtHelper } from "../../helper/jwtHelper";
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.accessToken;
            if (!token) {
                throw new Error("You are not authorized!");
            }
            // verify token 
            const verifyUser = jwtHelper.verifyToken(token, "asdf");
            req.user = verifyUser;
            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new Error("You are not authorized!");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
