import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { doctorService } from "./doctor.service";
import sendResponse from "../../shared/sendResponse";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await doctorService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor created successfully!",
        data: result
    });
});

export const DoctorController = {
    createDoctor
};
