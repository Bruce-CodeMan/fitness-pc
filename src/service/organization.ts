/*
 * @Date: 2023-04-18 16:47:58
 * @Author: Bruce
 * @Description: 
 */
import { useMutation, useQuery } from "@apollo/client";
import { message } from "antd";
import { GET_ORGANIZATION, GET_ORGANIZATIONS, COMMIT_ORGANIZATION, DEL_ORGANIZATION } from "../graphql/organization";
import { DEFAULT_PAGE_SIZE } from "../utils/constant";
import { TOrganizationsQuery, TOrganizationQuery, TBaseOrganization } from "../utils/types";

// 通过分页获取Organizations
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

 // 通过ID获取一个Organization
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

 // 编辑Organization
 export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
     const [edit, { loading }] = useMutation(COMMIT_ORGANIZATION);
     const handleEdit = async(id: number, params: TBaseOrganization) => {
         const res = await edit({
             variables: {
                 id,
                 params
             }
         })
         message.info(res.data.commitOrganization.message);
     }

     return [ handleEdit, loading ];
 }

 // 删除Organization
 export const useDeleteOrg = (): [handleDel: Function, loading: boolean] => {
     const [del, { loading }] = useMutation(DEL_ORGANIZATION);

     const handleDel = async (id: number, callback: () => void) => {
         const res = await del({
             variables: {
                 id
             },
         });
         if(res.data.deleteOrganization.code === 200) {
             message.success(res.data.deleteOrganization.message);
             callback();
             return;
         }
         message.error(res.data.deleteOrganization.message);
     }
     return [handleDel, loading]

 }