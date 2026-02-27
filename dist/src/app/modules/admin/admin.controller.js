import catchAsync from "../../shared/catchAsync";
import { adminService } from "./admin.service";
import sendResponse from "../../shared/sendResponse";
const createAdmin = catchAsync(async (req, res) => {
    const result = await adminService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin created successfully!",
        data: result
    });
});
export const AdminController = {
    createAdmin
};
