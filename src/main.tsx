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
import { routes } from './routes/menus';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';
import { ROUTE_COMPONENT } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
      
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<Layout />}>
            { routes.map((item) => {
              const Component = ROUTE_COMPONENT[item.key]
              return( <Route path={item.path} key={item.path} element={<Component/>}/>)
            }
            )}
          </Route>
        </Routes>
        </UserInfo>
      </BrowserRouter>
      
  </ApolloProvider>
    
)


