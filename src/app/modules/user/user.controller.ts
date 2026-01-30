import { Request,Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";

const createPatient = catchAsync(async(req:Request, res:Response) => {
    console.log(req.body); 
    const result = await userService.createPatient(req.body)
    console.log(result)
    res.send({
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

export const UserController = {
    createPatient
}