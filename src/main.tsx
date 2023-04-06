/*
 * @Date: 2023-04-06 14:27:08
 * @Author: Bruce
 * @Description: 
 */
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
    
)
