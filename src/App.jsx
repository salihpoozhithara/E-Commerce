/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List';
import Orders from './Pages/Orders';
import Login from './components/Login'
// for toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// before making api call create some variables
export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {
  // when we are not authenticated then we will display login component using token
    const [token,setToken] =useState(localStorage.getItem('token')?localStorage.getItem('token'):"")


    // if the reload website logout automatically - to resolve this use local storage 
    useEffect(()=>{
      // whenever token will updated the local storage is store the data
      localStorage.setItem('token',token)

    },[token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {/* check token not availbla logib component will display*/}
      { token === "" 
      ? <Login setToken={setToken} /> 
      :<>
      <Navbar setToken={setToken}/>
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div>
          <Routes>
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
    
    </> 
    }
      
    </div>
  )
}

export default App