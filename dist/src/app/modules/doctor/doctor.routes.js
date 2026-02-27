import express from "express";
import { DoctorController } from "./doctor.controller";
import { fileUploader } from "../../../helper/fileUploader";
import { DoctorValidation } from "./doctor.validation";
const router = express.Router();
// POST /api/v1/doctor/create-doctor
router.post("/create-doctor", 
// Step 1: Multer handles file upload (profile photo)
fileUploader.upload.single('file'), 
// Step 2: Parse + validate the JSON body and call controller
(req, res, next) => {
    console.log("Route Check - req.file:", req.file);
    console.log("Route Check - req.body.data:", req.body.data);
    req.body = DoctorValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data));
    return DoctorController.createDoctor(req, res, next);
});
export const doctorRoutes = router;
