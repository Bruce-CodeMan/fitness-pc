/*
 * @Date: 2023-04-13 14:51:02
 * @Author: Bruce
 * @Description: 
 */
import { gql } from "@apollo/client";

export const GET_OSS_INFO = gql`
query getOSSInfo {
    getOSSInfo{
      expire
      policy
      signature
      accessId
      host
      dir
    }
  }
`;