/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List';
import Orders from './Pages/Orders';
import Login from './components/Login'

const App = () => {
  // when we are not authenticated then we will displaylogin component
    const [token,setToken] =useState('')

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* check token not availbla logib component will display*/}
      { token === "" 
      ? <Login /> 
      :<>
      <Navbar/>
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div>
          <Routes>
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<List />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </div>
    
    </> 
    }
      
    </div>
  )
}

export default App