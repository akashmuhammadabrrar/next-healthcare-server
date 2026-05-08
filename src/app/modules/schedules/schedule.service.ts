import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../../lib/prisma";
import calculatePagination from "../../../helper/paginationHelper";
import { Prisma } from "../../../../generated/prisma/client";
import { IJWTPaload } from "../../types/common";

const insertIntoDB = async (payload: any) => {
    
  const {startTime, endTime, startDate,endDate,} = payload;
  console.log({startDate, endDate, startTime,endTime})

  const intervalTime = 30;
  const schedules = [];


  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while(currentDate <=lastDate){
    let startDateTime=    new Date( addMinutes(
             addHours(
            `${format(currentDate, 'yyyy-MM-dd' )}`,
            Number(startTime.split(":")[0])
         ),
        Number(startTime.split(":")[1])
        )
    )

    const endDateTime=    new Date( addMinutes(
             addHours(
            `${format(currentDate, 'yyyy-MM-dd' )}`,
            Number(endTime.split(":")[0])
         ),
        Number(endTime.split(":")[1])
        )
    )

    console.log({startDateTime, endDateTime})

    while(startDateTime < endDateTime) {

        const slotEndDateTime = addMinutes(startDateTime, intervalTime);

        const scheduleData = {
            startDateTime: startDateTime,
            endDateTime: slotEndDateTime,
            
        }
        console.log({scheduleData})
        const isExistingSchedule = await prisma.schedule.findFirst({
            where:scheduleData
        })
        if(!isExistingSchedule) {
            await prisma.schedule.create({
                data: scheduleData
            })
            schedules.push(scheduleData);
        }

        startDateTime = addMinutes(startDateTime, intervalTime);


    }
      
    currentDate.setDate(currentDate.getDate() + 1);

    } 

    return schedules;
}

// schedule for doctor services. 
const scheduleForDoctor = async ( 
user: IJWTPaload, filters: any, options: any, ) => {
    
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);
    const  {startDateTime:filterStartDateTime, endDateTime:filterEndDateTime} = filters; 
    // add an and condition here, 
    const andConditions: Prisma.ScheduleWhereInput[] = [];

    if(filterStartDateTime && filterEndDateTime) {
        andConditions.push({
            startDateTime: {
                gte: filterStartDateTime,
                lte: filterEndDateTime
            }
        })
    }

    // build the condition, 
    const whereConditions:Prisma.ScheduleWhereInput = andConditions.length > 0 ? { AND: andConditions} : {};

     const doctorSchedules =  await prisma.doctorSchedule.findMany({
        where: {
            doctor:{
                email: user.email,
            }
        },
        select: {
            scheduleId: true,
            
        }
     })
    // execute the query
    const doctorScheduleIds = doctorSchedules.map(ds => ds.scheduleId);
    const result = await prisma.schedule.findMany({
        where: {
            ...whereConditions,
            id:{
                notIn: doctorScheduleIds
            }

        },
        skip,
        take: limit, 
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {createdAt: 'desc'},
    });

    const total = await prisma.schedule.count({
        where: {
            ...whereConditions,
            id:{
                notIn: doctorScheduleIds
            }

        },
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


//  delete schedule 
const deleteScheduleFromDB  = async(id:string) => {
    return prisma.schedule.delete({
        where:{
            id
        }
    })
}

export const ScheduleService = {
    insertIntoDB,
    scheduleForDoctor ,
    deleteScheduleFromDB
}


















