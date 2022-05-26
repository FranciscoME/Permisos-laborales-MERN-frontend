import React from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Sidebar = () => {
  const { auth:{nombre,_id} } = useAuth();
  

  return (
    <aside  className='flex flex-col  '>
      <p className='mb-10 font-bold text-2xl'>Hola {nombre.split(' ')[0]}</p>
      <Link
        to='nuevo-permiso'
        className='bg-sky-600 md:w-full p-3 mt-5 rounded-md text-white text-center font-bold m-4'
      >
        Nuevo Permiso
      </Link>

      <Link
        to={`modificar-usuario/${_id}`}
        className=' bg-stone-400 md:w-full p-3 mt-5 rounded-md  text-center m-4 font-semibold'
      >
       Cambiar mis datos
      </Link>
    </aside>
  )
}

export default Sidebar