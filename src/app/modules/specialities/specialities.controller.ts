import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { SpecialtiesService, IPaginationOptions } from "./specialities.service";
import pick from "../../../helper/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.insertIntoDB(req);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Specialty created successfully!",
        data: result,
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]) as IPaginationOptions;

    const result = await SpecialtiesService.getAllFromDB(options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const result = await SpecialtiesService.deleteFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialty deleted successfully",
        data: result,
    });
});

export const SpecialtiesController = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
};