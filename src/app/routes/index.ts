import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { atuhRoutes } from '../modules/auth/auth.routes';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { adminRoutes } from '../modules/admin/admin.routes';
import { scheduleRoutes } from '../modules/schedules/schedule.routes';


const router = express.Router();

const moduleRoutes = [ 
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: atuhRoutes
    },
    {
        path: '/doctor',
        route: doctorRoutes
    },
    {
        path: '/admin',
        route: adminRoutes
    },
    {
        path: '/schedule',
        route: scheduleRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;