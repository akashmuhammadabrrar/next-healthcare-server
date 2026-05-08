import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.servicec";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await DoctorScheduleService.insertIntoDB(user, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor Schedule Created Successfully",
        data: result
    })
});

export const DoctorScheduleController = {
    insertIntoDB
}