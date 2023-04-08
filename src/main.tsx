/*
 * @Date: 2023-04-06 14:27:08
 * @Author: Bruce
 * @Description: 
 */
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_CONFIG } from './routes';
import UserInfo from './components/UserInfo';
import NotFound from './containers/404';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <UserInfo />
    <BrowserRouter>
      <Routes>
        { ROUTE_CONFIG.map((item) => 
          <Route path={item.path} key={item.key} element={<item.element/>}/>
          )}
          <Route path="*" element={ <NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
    
)
