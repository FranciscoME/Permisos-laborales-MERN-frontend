import React from 'react'
import PreviewPermiso from '../components/PreviewPermiso';
import usePermiso from '../hooks/usePermiso';

const Permisos = () => {
  const { permisos } = usePermiso();

  return (
      <div className='m-10'>

        <h1
          className='ml-10 text-4xl font-black text-center'
        >Mis Permisos</h1>

        <div className='bg-white shadow  rounded-lg  m-10 '>
          {
            permisos.map((permiso) => (
              <PreviewPermiso
                key={permiso._id}
                permiso={permiso}
              />
            ))
          }
        </div>
      </div>

  )
}

export default Permisos