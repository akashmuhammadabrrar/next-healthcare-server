import z from "zod";
const createDoctorValidationSchema = z.object({
    password: z.string(),
    doctor: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        contactNumber: z.string().min(1, "Contact number is required"),
        address: z.string().min(1, "Address is required"),
        registrationNumber: z.string().min(1, "Registration number is required"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"]),
        appointmentFee: z.number({ error: "Appointment fee is required" }),
        qualification: z.string().min(1, "Qualification is required"),
        designation: z.string().min(1, "Designation is required"),
        experience: z.number().optional(),
        currentWorkingPlace: z.string().optional(),
        profilePhoto: z.string().optional(),
    })
});
export const DoctorValidation = {
    createDoctorValidationSchema
};
