import { prisma } from "../../../lib/prisma";
import { IJWTPaload } from "../../types/common";

const insertIntoDB = async (user: IJWTPaload, payload: {
    scheduleIds: string[];
}) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });

    const doctorScheduleData = payload.scheduleIds.map(scheduleId => ( {
         doctorId: doctorData.id,
         scheduleId: scheduleId
    }));
    console.log(doctorScheduleData);
    
    return await prisma.doctorSchedule.createMany({
        data: doctorScheduleData
    });
};


export const DoctorScheduleService = {
    insertIntoDB
};