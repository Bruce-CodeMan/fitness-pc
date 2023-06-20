import { useMutation, useQuery } from "@apollo/client";

// Custom Imports
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { TBaseCourse, TCoursesQuery } from "../utils/types";
import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from "../graphql/course";
import { message } from "antd";

export const useCourses = (
    pageNum = 1,
    pageSize = DEFAULT_PAGE_SIZE
) => {
    const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
        skip: true,
        variables: {
            page: {
                pageNum,
                pageSize
            }
        }
    });

    const refetchHandler = async (pn = 1 , ps = DEFAULT_PAGE_SIZE, name='') => {
        const { data: res, errors } = await refetch({
            name,
            page: {
                pageNum: pn,
                pageSize: ps
            }
        });
        if(errors) {
            return {
                success: false
            }
        }

        return {
            page: res?.getCourses.page,
            data: res?.getCourses.data
        }
    }

    return {
        loading,
        refetch: refetchHandler,
        page: data?.getCourses.page,
        data: data?.getCourses.data
    }
}

export const useEditInfo = ():[handleEdit: Function, loading: boolean] => {
    const [ edit, { loading } ] = useMutation(COMMIT_COURSE)

    const handleEdit = async(id: number, params: TBaseCourse, callback: (isReload: boolean) => void) => {
        const res = await edit({
            variables: {
                id,
                params
            }
        })
        if(res.data.commitCourseInfo.code === 200) {
            message.success(res.data.commitCourseInfo.message)
            callback(true);
            return
        }
        message.error(res.data.commitCourseInfo.message)
    }
    return [handleEdit, loading]
}

export const useCourse = () => {
    const { data, refetch } = useQuery(GET_COURSE, {
        skip: true
    });
    return { data, refetch }
}