/*
 * @Date: 2023-04-06 14:52:47
 * @Author: Bruce
 * @Description: 
 */
import { gql } from "@apollo/client";

export const SEND_CODE_MSG = gql`
mutation sendCodeMsg($tel: String!) {
  sendCodeMsg(tel: $tel)
}`;

export const LOGIN = gql`
mutation login($tel: String!, $code: String!) {
  login(tel: $tel, code: $code)
}
`;