import z from "zod";
import { TCreateAdminInput } from "./admin.interface";

const createAdminValidationSchema: z.ZodType<TCreateAdminInput> = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    admin: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        contactNumber: z.string().min(1, "Contact number is required"),
        profilePhoto: z.string().optional(),
    })
});

export const AdminValidation = {
    createAdminValidationSchema
};
