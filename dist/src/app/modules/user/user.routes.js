import experess from "express";
import { UserController } from "./user.controller";
import { fileUploader } from "../../../helper/fileUploader";
import { UserValidation } from "./user.validation";
const router = experess.Router();
// create patient user
router.post("/create-patient", fileUploader.upload.single('file'), (req, res, next) => {
    console.log("Route Check - req.file:", req.file);
    console.log("Route Check - req.body.data:", req.body.data);
    req.body = UserValidation.createPatientValidationSchema.parse(JSON.parse(req.body.data));
    return UserController.createPatient(req, res, next);
});
export const userRoutes = router;
