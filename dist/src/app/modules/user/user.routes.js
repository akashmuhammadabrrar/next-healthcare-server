import experess from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../../helper/fileUploader";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/client";
const router = experess.Router();
// get all users from db
router.get("/", auth(UserRole.ADMIN), UserController.getAllFromDB);
// create patient userp
router.post("/create-patient", fileUploader.upload.single('file'), (req, res, next) => {
    console.log("Route Check - req.file:", req.file);
    console.log("Route Check - req.body.data:", req.body.data);
    req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createPatient(req, res, next);
});
// create admin user
router.post("/create-admin", auth(UserRole.ADMIN), fileUploader.upload.single('file'), (req, res, next) => {
    console.log("Route Check - req.file:", req.file);
    console.log("Route Check - req.body.data:", req.body.data);
    req.body = UserValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
});
// create doctor user
router.post("/create-doctor", auth(UserRole.ADMIN), fileUploader.upload.single('file'), (req, res, next) => {
    console.log("Route Check - req.file:", req.file);
    console.log("Route Check - req.body.data:", req.body.data);
    req.body = UserValidation.createDoctorValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createDoctor(req, res, next);
});
export const userRoutes = router;
