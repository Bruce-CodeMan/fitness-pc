/*
 * @Date: 2023-04-18 16:51:03
 * @Author: Bruce
 * @Description: 
 */
import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
query getOrganizations($page: PageInput!) {
  getOrganizations(page: $page) {
    code
    message
    data{
      id
      name
      address
      tags
    }
    page{
      pageNum
      pageSize
      total
    }
  }
}
`;