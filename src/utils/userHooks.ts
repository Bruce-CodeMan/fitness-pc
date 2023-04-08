import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "./contextFactory";
import { GET_USER } from "../graphql/user";

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
    useQuery(GET_USER, {
        onCompleted: (data) => {
            console.log("data:", data);
        }
    });
}