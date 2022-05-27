import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <main className='md:w-3/6  mx-auto '>
      <h2 className='md:mt-1 p-2 md:flex md:justify-center font-extrabold text-2xl '>Sistema de permisos RH H. Psiquiatrico</h2>
      <Outlet/>

    </main>
    </>
  )
}

export default AuthLayout