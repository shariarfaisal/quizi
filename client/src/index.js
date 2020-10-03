import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/style.scss'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000/'

const adminToken = localStorage.getItem('x-admin-token')
if(adminToken){
  axios.defaults.headers.common['Authorization'] = adminToken
}

const userToken = localStorage.getItem('x-user-token')
if(userToken){
  axios.defaults.headers.common['Authorization'] = userToken
}

ReactDOM.render(
  <App />,
   document.getElementById('root')
);
