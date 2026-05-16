import z from "zod";

const createDoctorSchecduleValidationSchema = z.object({
    body: z.object({
        scheduleIds: z.array(z.string().min(1))
    })
})

export const DoctorScheduleValidation = {
    createDoctorSchecduleValidationSchema,
}