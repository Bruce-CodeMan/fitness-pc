/*
 * @Date: 2023-04-12 10:56:55
 * @Author: Bruce
 * @Description: 
 */
import { useQuery } from "@apollo/client";
import { connectFactory, useAppContext } from "../utils/contextFactory";
import { GET_USER } from "../graphql/user";
import { IUser } from "../utils/types";
import { useLocation, useNavigate } from "react-router-dom";

const KEY = 'userInfo'
const DEFAULT_VALUE = {}

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
    const {setStore} = useUserContext();
    const location = useLocation();
    const nav = useNavigate();
    const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
        onCompleted: (data) => {
            if(data.getUserInfo){
                const { id, tel, name, desc, avatar } = data.getUserInfo;
                setStore({
                    id,
                    tel,
                    name,
                    desc,
                    avatar
                    
                });
                if(location.pathname.startsWith('/login')) {
                    nav('/');
                }
                return ;
            }
            setStore({ refetchHandler: refetch });
            if(location.pathname !== '/login'){              
                nav(`/login?orignalUrl=${location.pathname}`);
            }       
        },
        onError: () => {
            setStore({ refetchHandler: refetch });
            if(location.pathname !== '/login'){   
                nav(`/login?orignalUrl=${location.pathname}`);
            }   
        }
    });

    return { loading, refetch };
}

