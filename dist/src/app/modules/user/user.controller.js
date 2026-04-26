import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../../helper/pick";
import { userFilterableFields, userOptionsFilterableFields } from "./user.constants";
const createPatient = catchAsync(async (req, res) => {
    const result = await userService.createPatient(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    });
});
// get All from db 
const getAllFromDB = catchAsync(async (req, res) => {
    // pick function for params 
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, userOptionsFilterableFields);
    const result = await userService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Users fetched successfully!",
        meta: result.meta,
        data: result.data
    });
});
const createAdmin = catchAsync(async (req, res) => {
    const result = await userService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin created successfully!",
        data: result
    });
});
const createDoctor = catchAsync(async (req, res) => {
    const result = await userService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor created successfully!",
        data: result
    });
});
export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFromDB
};
