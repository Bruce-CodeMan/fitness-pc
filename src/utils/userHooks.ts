import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "./contextFactory";
import { GET_USER } from "../graphql/user";
import { IUser } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
    const {setStore} = useUserContext();
    const location = useLocation();
    const nav = useNavigate();
    useQuery<{ getUserInfo: IUser }>(GET_USER, {
        onCompleted: (data) => {
            if(data.getUserInfo){
                const { id, tel, name } = data.getUserInfo;
                setStore({
                    id,
                    tel,
                    name
                });
                if(location.pathname.startsWith('/login')) {
                    nav('/');
                }
                return ;
            }
            if(location.pathname !== '/login'){
                nav(`/login?orignalUrl=${location.pathname}`);
            }       
        },
        onError: () => {
            if(location.pathname !== '/login'){
                nav(`/login?orignalUrl=${location.pathname}`);
            }   
        }
    });
}

