/*
 * @Date: 2023-04-06 14:27:08
 * @Author: Bruce
 * @Description: 
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ApolloClient } from '@apollo/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
