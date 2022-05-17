import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
    <main>
      <h2 className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center bg-sky-600 '>Sistema de papeletas RH Psiquiatrico</h2>
      <Outlet/>

    </main>
    </>
  )
}

export default AuthLayout