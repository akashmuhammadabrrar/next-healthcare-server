import { UserStatus } from "../../../../generated/prisma/client";
import { jwtHelper } from "../../../helper/jwtHelper";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../../config";

const login = async (payload: {email: string, password: string} ) => {
  console.log(payload);
  const user = await prisma.user.findUniqueOrThrow({
   where: {
    email: payload.email,
    status: UserStatus.ACTIVE
   }
  })
  const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
  if(!isCorrectPassword){
    throw new Error("Password is not correct")
  }

//   generate jwt access token
 const accessToken = jwtHelper.generateToken({email: user.email, role: user.role}, config.jwt.access_secret as string, config.jwt.access_expires_in as string);   
//  generate refresh token
const refreshToken = jwtHelper.generateToken({email: user.email, role: user.role}, config.jwt.refresh_secret as string, config.jwt.refresh_expires_in as string);
 return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange
 }
}

export const authService = {
    login
}