/*
 * @Date: 2023-04-10 09:40:33
 * @Author: Bruce
 * @Description: 
 */
import { gql } from "@apollo/client";

export const GET_USER = gql`
    query getUserInfo {
        getUserInfo {
            id
            tel
            desc
            name
            avatar
        }
    }
`;

export const UPDATE_USER = gql`
    mutation update($id: String!, $params: UserInput!){
        update(id: $id, params: $params) {
            code
            message
        }
    }
`;