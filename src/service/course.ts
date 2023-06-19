import { useQuery } from "@apollo/client";

// Custom Imports
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { TCoursesQuery } from "../utils/types";
import { GET_COURSES } from "../graphql/course";

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