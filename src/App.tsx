import { useEffect, useState } from 'react'
import './App.css'

import GanttApp from './components/ganttApp'
import { useUser } from './provider/userContex'
import Login, { user } from './components/auth/login';
import { UserServices } from './services/user';
import useNotification from './util/notify';




function App() {
   const {user, logged} =useUser();
   const userService = new UserServices();
   const {contextHolder, notify} = useNotification();

   // inicio de sesion
   const login = async (data: user) => {

    try {
      const res = await userService.createUser(data)
    
      if (res.success) {
        logged({name: res.user.name, token: res.token, idUser: res.user.idUser})
        localStorage.setItem("token", res.token)
      }else {
        notify(res.message, "warning")

      }
            
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className=''>
        {contextHolder}
        {
          user?.token ?<GanttApp />:<Login setUser={login} />
        }
      </div>

    </>
  )
}

export default App
