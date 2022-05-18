import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <main className='container mx-50'>
      <h2 className='md:mt-1 p-5 md:flex md:justify-center font-extrabold text-3xl '>Sistema de papeletas RH Psiquiatrico</h2>
      <Outlet/>

    </main>
    </>
  )
}

export default AuthLayout