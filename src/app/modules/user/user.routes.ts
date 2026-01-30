import experess from "express";
import { UserController } from "./user.controller";

const router =  experess.Router();

// create patient user
router.post(
    "/create-patient",
    UserController.createPatient
)

export const userRoutes = router;
