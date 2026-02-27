import { Request } from "express";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../../helper/fileUploader";
import { TCreateDoctorInput, TDoctor } from "./doctor.interface";

const createDoctor = async (req: Request): Promise<TDoctor> => {
    console.log("Service Check - req.file:", req.file);

    // Step 1: Upload profile photo to Cloudinary if provided
    const data: TCreateDoctorInput = req.body;

    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        data.doctor.profilePhoto = uploadedResult?.secure_url;
        console.log({ uploadedResult });
    }

    // Step 2: Hash the password — NEVER store plain text
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Step 3: Use transaction — create User + Doctor atomically
    // If either fails, both are rolled back (no ghost records)
    const result = await prisma.$transaction(async (tnx) => {

        // First: create the User (login record)
        await tnx.user.create({
            data: {
                email: data.doctor.email,
                password: hashedPassword,
                role: "DOCTOR"   // <-- key difference from Patient
            }
        });

        // Second: create the Doctor (profile record)
        const newDoctor = await tnx.doctor.create({
            data: data.doctor
        });

        return newDoctor;
    });

    return result;
};

export const doctorService = {
    createDoctor
};