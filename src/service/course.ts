import { useQuery } from "@apollo/client";

// Custom Imports
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { TOrganizationsQuery } from "../utils/types";
import { GET_COURSES } from "../graphql/course";

export const useCourses = (
    pageNum = 1,
    pageSize = DEFAULT_PAGE_SIZE
) => {
    const { loading, data, refetch } = useQuery<TOrganizationsQuery>(GET_COURSES, {
        variables: {
            page: {
                pageNum,
                pageSize
            }
        }
    })

    return {
        loading,
        refetch,
        page: data?.getCourses.page,
        data: data?.getCourses.data
    }
}