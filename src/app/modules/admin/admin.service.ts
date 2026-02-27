import bcrypt from "bcryptjs";
import { prisma } from "../../../lib/prisma";
import { fileUploader } from "../../../helper/fileUploader";
import { Request } from "express";
import { TCreateAdminInput, TAdmin } from "./admin.interface";

const createAdmin = async (req: Request): Promise<TAdmin> => {
    const data: TCreateAdminInput = req.body;

    // Step 1: Upload profile photo to Cloudinary if provided
    if (req.file) {
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        data.admin.profilePhoto = uploadedResult?.secure_url;
    }

    // Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Step 3: Transaction to create User and Admin
    const result = await prisma.$transaction(async (tnx) => {
        // Create User
        await tnx.user.create({
            data: {
                email: data.admin.email,
                password: hashedPassword,
                role: "ADMIN"
            }
        });

        // Create Admin profile
        const newAdmin = await tnx.admin.create({
            data: data.admin
        });

        return newAdmin;
    });

    return result;
};

export const adminService = {
    createAdmin
};
