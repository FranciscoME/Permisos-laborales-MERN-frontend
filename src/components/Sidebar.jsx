import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth:{nombre} } = useAuth();
  

  return (
    <aside >
      <p className='mb-10'>Hola: {nombre}</p>
      <Link
        to='nuevo-permiso'
        className='bg-sky-600 w-full p-3 mt-5'
      >
        Nuevo Permiso
      </Link>
    </aside>
  )
}

export default Sidebar