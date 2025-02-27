import { useEffect, useState } from 'react'
import './App.css'

import GanttApp from './components/ganttApp'
import { useUser } from './provider/userContex'
import Login, { user } from './components/auth/login';




function App() {
   const {user, logged} =useUser();

   // inicio de sesion
   const login = async (data: user) => {
    
    logged({name: "user", token: "token", idUser: "1234"})
    console.log("llegaron", data)
  }

  return (
    <>
      <div className=''>
        {
          user?.token?<GanttApp />:<Login setUser={login} />
        }
      </div>

    </>
  )
}

export default App
