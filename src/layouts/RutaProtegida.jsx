import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { Orbit } from '@uiball/loaders'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return 'Cargando...'
    // return (
    // <NewtonsCradle 
    //  size={40}
    //  speed={1.4} 
    //  color="black" 
    // />)
  }

  // console.log(auth);
  return (
    <>
      {auth?._id ? (
        <div className='bg-gray-300'>
          <Header />
          <div className='md:flex md:min-h-screen'>
            <Sidebar />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      )
        : <Navigate to='/'/>
      }
    </>
  )
}

export default RutaProtegida