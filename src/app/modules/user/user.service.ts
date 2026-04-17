import {   Request} from "express";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../../helper/fileUploader";
import calculatePagination from "../../../helper/paginationHelper";
const createPatient = async(req:Request) => {
    console.log("Service Check - req.file:", req.file);

    // upload file
    if(req.file){
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadedResult?.secure_url;
        console.log({uploadedResult})
    }
    const hashedPassword =  await bcrypt.hash(req.body.password, 10);
    // create user by transaction for create multiple user at the same time (user and patient)
    const result = await prisma.$transaction(async(tnx) => {
        // create user 
        const newUser = await tnx.user.create({
            data:{
                email: req.body.patient.email,
                password: hashedPassword 
            }
        });
        
        // create patient
        const newPatient = await tnx.patient.create({
            data: req.body.patient
        });

        return newPatient;
    })
    return result;
}


const createAdmin = async(req:Request) => {
    console.log("Service Check - req.file:", req.file);

    // upload file
    if(req.file){
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.admin.profilePhoto = uploadedResult?.secure_url;
        console.log({uploadedResult})
    }
    const hashedPassword =  await bcrypt.hash(req.body.password, 10);
    const result = await prisma.$transaction(async(tnx) => {
        // create user 
        const newUser = await tnx.user.create({
            data:{
                email: req.body.admin.email,
                password: hashedPassword,
                role: "ADMIN"
            }
        });
        
        // create admin
        const newAdmin = await tnx.admin.create({
            data: req.body.admin
        });

        return newAdmin;
    })
    return result;
}

const createDoctor = async(req:Request) => {
    console.log("Service Check - req.file:", req.file);

    // upload file
    if(req.file){
        const uploadedResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.doctor.profilePhoto = uploadedResult?.secure_url;
        console.log({uploadedResult})
    }
    const hashedPassword =  await bcrypt.hash(req.body.password, 10);
    const result = await prisma.$transaction(async(tnx) => {
        // create user 
        const newUser = await tnx.user.create({
            data:{
                email: req.body.doctor.email,
                password: hashedPassword,
                role: "DOCTOR"
            }
        });
        
        // create doctor
        const newDoctor = await tnx.doctor.create({
            data: req.body.doctor
        });

        return newDoctor;
    })
    return result;
}

// get all users

const getAllFromDB = async (filters: any, options: any) => {
    const { searchTerm, role, status } = filters;

    // pagination with default value if not provided
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const whereCondition = {
        ...(searchTerm && { email: { contains: searchTerm, mode: 'insensitive' } }),
        ...(role && { role: role as any }),
        ...(status && { status: status as any }),
    };
   
    const result = await prisma.user.findMany({
        skip,
        take: limit, 
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {createdAt: 'desc'},
        where: whereCondition
    });

    // let's work with metadata 

    const total = await prisma.user.count({
        where: whereCondition
    });
   
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
} 




export const userService = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFromDB
}