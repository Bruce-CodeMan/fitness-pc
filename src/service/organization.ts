/*
 * @Date: 2023-04-18 16:47:58
 * @Author: Bruce
 * @Description: 
 */
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import { GET_ORGANIZATION, GET_ORGANIZATIONS, COMMIT_ORGANIZATION } from "../graphql/organization";
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { TOrganizationsQuery, TOrganizationQuery, TBaseOrganization } from "../utils/types";

 export const useOrganizations = (pageNum=1, pageSize=DEFAULT_PAGE_SIZE) => {
     const { loading, data, refetch } = useQuery<TOrganizationsQuery>(GET_ORGANIZATIONS, {
         variables: {
             page: {
                 pageNum,
                 pageSize
             }
         }
     });
     return {
         loading,
         refetch,
         page: data?.getOrganizations.page,
         data: data?.getOrganizations.data
     }
 }

 export const useOrganization = (id: string) => {
    const { loading, data } = useQuery<TOrganizationQuery>(GET_ORGANIZATION,{
        variables: {
            id
        }
    });

    return {
        loading,
        data: data?.getOrganizationInfo.data,
    }
 }

 export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
     const [edit, { loading }] = useMutation(COMMIT_ORGANIZATION);

     const handleEdit = async(id: number, params: TBaseOrganization) => {
         const res = await edit({
             variables: {
                 id,
                 params
             }
         })
         console.log(res)
         message.info(res.data.commitOrganization.message);
     }

     return [ handleEdit, loading ];
 }