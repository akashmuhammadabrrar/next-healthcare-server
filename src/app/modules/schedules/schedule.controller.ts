import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import pick from "../../../helper/pick";

const insertIntoDB = catchAsync(async (req:Request, res: Response) => {
      const result = await ScheduleService.insertIntoDB(req.body);

      sendResponse(res, {
        statusCode: 201,
        success:true,
        message: 'Schedule inserted successfully',
        data: result
      })
})



// schedules for doctor

const schedulesForDoctor = catchAsync(async (req: Request, res: Response) => {

   const options = pick(req.query, ['page', 'limit', 'searchTerm', 'sortBy', 'sortOrder']);
  const filters = pick(req.query, ["startDateTime", "endDateTime"])
   const result=  await ScheduleService.scheduleForDoctor(filters,options);
   sendResponse(res, {
    statusCode: 201,
    success:true,
    message: 'Schedule fetched for doctor successfully',
    data: result
   })
})

// delete schedule 

const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id} = req.params;
  const result = await ScheduleService.deleteScheduleFromDB(id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Schedule deleted successfully',
    data: result
  })
})


export const ScheduleController = {
    insertIntoDB,
    schedulesForDoctor,
    deleteScheduleFromDB
}