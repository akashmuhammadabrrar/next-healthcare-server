import {   Request} from "express";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../../helper/fileUploader";
const createPatient = async(req:Request) => {
    console.log("Service Check - req.file:", req.file);

    // upload file
    if(req.file){
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadedResult?.secure_url;
        console.log({uploadedResult})
    }
    const hashedPassword =  await bcrypt.hash(req.body.password, 10);
    // create user by transaction for create multiple user at the same time (user and patient)
    const result = await prisma.$transaction(async(tnx) => {
        // create user 
        const newUser = await tnx.user.create({
            data:{
                email: req.body.patient.email,
                password: hashedPassword 
            }
        });
        
        // create patient
        const newPatient = await tnx.patient.create({
            data: req.body.patient
        });

        return newPatient;
    })
    return result;
}


export const userService = {
    createPatient
}