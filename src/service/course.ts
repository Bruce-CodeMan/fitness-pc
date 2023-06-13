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
        variables: {
            page: {
                pageNum,
                pageSize
            }
        }
    });

    const refetchHandler = async (pn: number, ps: number) => {
        const { data: res } = await refetch({
            page: {
                pageNum: pn,
                pageSize: ps
            }
        })

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