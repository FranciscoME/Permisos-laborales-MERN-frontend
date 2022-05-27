import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePermiso from '../hooks/usePermiso';

const Header = () => {

  const {cerrarSesionAuth} = useAuth();
  const {cerrarSesionPermisos} = usePermiso();

  const cerrarSesion = ()=>{
    cerrarSesionAuth();
    cerrarSesionPermisos();
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
      <div className=' md:flex md:justify-between'>
        <h2 className='text-3xl text-sky-400 font-black text-center mb-5 md:mb-0'>Permisos HP</h2>

        <div className='flex flex-col md:flex-row items-center gap-4'>

          {/* <button
            type='button'
            className='font-bold uppercase'
          >
            Buscar Permiso
          </button> */}

          <Link
            to="/permisos"
            className='font-bold uppercase hover:bg-sky-400 p-3 rounded transition-colors'
          >
          Mis Permisos
          </Link>

          <button
            type='button'
            className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
            onClick={cerrarSesion}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header