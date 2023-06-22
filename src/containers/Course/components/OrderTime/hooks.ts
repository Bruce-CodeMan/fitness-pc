import { useMemo, useState } from "react";
import { useCourseInfo, useEditCourseInfo } from "../../../../service/course";
import { DAYS, IDay, isWorkDay } from "./constants";
import { IOrderTime, IWeekCourse, TWEEK } from "../../../../utils/types";


export const useOrderTime = (id: string, currentDayKey: TWEEK) => {
    
    const { data, loading, refetch } = useCourseInfo(id);
    const [ edit, editLoading ] = useEditCourseInfo();

    const orderTime = useMemo(
        () => (data?.reducibleTime || []).find((item) => item.week 
        === currentDayKey)?.orderTime || [],
        [data, currentDayKey]
    )

    

    

    const onSaveHandler = (ot: IOrderTime[]) => {
        const rt = [...(data?.reducibleTime || [])]
        const index = rt.findIndex((item) => item.week === currentDayKey)
        if(index > -1) {
            rt[index] = {
                week: currentDayKey,
                orderTime:ot
            }
        }else{
            rt.push({
                week: currentDayKey,
                orderTime: ot
            })
        }
        edit(id, {
            reducibleTime: rt
        }, () => refetch())
    }

    const onDeleteHandler = (key: number) => {
        const newData = orderTime.filter((item) => item.key !== key);
        onSaveHandler(newData);
    }

    const allWorkDaySyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            if(isWorkDay(item.key)) {
                rt.push({
                    week: item.key,
                    orderTime
                })
            }
        })
        edit(id, {
            reducibleTime: rt
        }, () => refetch())
    }

    const allWeekDaySyncHandler = () => {
        const rt: IWeekCourse[] = [];
        DAYS.forEach((item) => {
            rt.push({
                week: item.key,
                orderTime
            })
        })
        edit(id, {
            reducibleTime: rt
        }, () => refetch())
    }

    return {
        orderTime,
        loading: loading || editLoading,
        onDeleteHandler,
        onSaveHandler,
        allWeekDaySyncHandler,
        allWorkDaySyncHandler
    }
}