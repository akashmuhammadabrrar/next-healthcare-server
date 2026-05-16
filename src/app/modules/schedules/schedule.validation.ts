import z from "zod";

// Regex: HH:mm  e.g. "08:00", "17:30"
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createScheduleValidationSchema = z.object({
    body: z.object({
        startDate: z
            .string({ error: "Start date is required" })
            .date("startDate must be a valid date (YYYY-MM-DD)"),
        endDate: z
            .string({ error: "End date is required" })
            .date("endDate must be a valid date (YYYY-MM-DD)"),
        startTime: z
            .string({ error: "Start time is required" })
            .regex(timeRegex, "startTime must be in HH:mm format (e.g. 08:00)"),
        endTime: z
            .string({ error: "End time is required" })
            .regex(timeRegex, "endTime must be in HH:mm format (e.g. 17:30)"),
    }),
});

export const ScheduleValidation = {
    createScheduleValidationSchema,
};
