import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth:{nombre,_id} } = useAuth();
  

  return (
    <aside >
      <p className='mb-10'>Hola: {nombre}</p>
      <Link
        to='nuevo-permiso'
        className='bg-sky-600 w-full p-3 mt-5'
      >
        Nuevo Permiso
      </Link>

      <Link
        to={`modificar-usuario/${_id}`}
        className='bg-sky-600 w-full p-3 mt-5'
      >
       Cambiar mis datos
      </Link>
    </aside>
  )
}

export default Sidebar