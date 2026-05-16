import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { Prisma } from "../../../generated/prisma/client";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode:number = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;

    if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === "P2002"){
            message = "Duplicate error",
            error = error.meta,
            statusCode= httpStatus.CONFLICT
        }
        if(error.code === "P1000"){
            message = "Invalid Credentials, your credendtials may be wrong",
            error = error.meta,
            statusCode = httpStatus.NOT_ACCEPTABLE
        }
         if(error.code === "P2003"){
            message ="Input Error, Please provide valid input (foreign key constraints failed)",
            error = error.meta,
            statusCode = httpStatus.BAD_REQUEST
        }
         if(error.code === "P2025"){
            message ="Invalid or Missing Data, The record you are trying to access or modify could not be found.",
            error = error.meta,
            statusCode = httpStatus.BAD_REQUEST
        }
    }

    else if(error instanceof Prisma.PrismaClientValidationError){
        message = "Validation Error, you might be providing wrong input.",
        error = error.message,
        statusCode = httpStatus.BAD_REQUEST
    }
     else if(error instanceof Prisma.PrismaClientUnknownRequestError){
        message = "Unknown Request Error, ",
        error = error.message,
        statusCode = httpStatus.BAD_REQUEST
    }
      else if(error instanceof Prisma.PrismaClientInitializationError){
        message = "Database Connection Error, the server is not able to connect with database.",
        error = error.message,
        statusCode = httpStatus.SERVICE_UNAVAILABLE
    }

    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;