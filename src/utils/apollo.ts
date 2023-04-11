/*
 * @Date: 2023-04-06 14:58:25
 * @Author: Bruce
 * @Description: 
 */
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN, HTTP_LINK } from "./constant";

const httpLink = createHttpLink({
    uri: HTTP_LINK,
})

const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token? `Bearer ${token}` : '',
        }
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})