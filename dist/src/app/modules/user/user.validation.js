import z from "zod";
const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().nonempty("Email is required"),
        address: z.string().optional(),
    })
});
const createAdminValidationSchema = z.object({
    password: z.string(),
    admin: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().nonempty("Email is required"),
        contactNumber: z.string().nonempty("Contact Number is required")
    })
});
const createDoctorValidationSchema = z.object({
    password: z.string(),
    doctor: z.object({
        name: z.string().nonempty("Name is required"),
        email: z.string().email("Invalid email address"),
        contactNumber: z.string().nonempty("Contact Number is required"),
        address: z.string().nonempty("Address is required"),
        registrationNumber: z.string().nonempty("Registration Number is required"),
        experience: z.number().int().optional().default(0),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        appointmentFee: z.number().int(),
        qualification: z.string().nonempty("Qualification is required"),
        currentWorkingPlace: z.string().optional(),
        designation: z.string().nonempty("Designation is required"),
    })
});
export const UserValidation = {
    createPatientValidationSchema,
    createAdminValidationSchema,
    createDoctorValidationSchema
};
