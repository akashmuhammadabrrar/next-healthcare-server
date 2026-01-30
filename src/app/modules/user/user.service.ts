import { prisma } from "../../../lib/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
const createPatient = async(payload:createPatientInput) => {
    const hashedPassword =  await bcrypt.hash(payload.password, 10);
    // create user by transaction for create multiple user at the same time (user and patient)
    const result = await prisma.$transaction(async(tnx) => {
        // create user
        const newUser = await tnx.user.create({
            data:{
                email: payload.email,
                password: hashedPassword 
            }
        });
        
        // create patient
        const newPatient = await tnx.patient.create({
            data: {
                name: payload.name,
                email: newUser.email,
                address: payload.address || "No address provided", // Fallback for now since it's required in schema
                isDeleted: false
            }
        });

        return newPatient;
    })
    return result;
}


export const userService = {
    createPatient
}