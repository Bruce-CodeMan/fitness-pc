/*
 * @Date: 2023-04-06 14:58:25
 * @Author: Bruce
 * @Description: 
 */
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
})