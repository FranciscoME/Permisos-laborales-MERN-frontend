import React from 'react'
import PreviewPermiso from '../components/PreviewPermiso';
import usePermiso from '../hooks/usePermiso';

const Permisos = () => {
  const {permisos}=usePermiso();

  return (
    <>
     <h1
     className='text-4xl font-black'
     >Mis Permisos</h1> 

    <div className='bg-white shadow mt-10 rounded-lg'>
      {
        permisos.map((permiso)=>(
          <PreviewPermiso
            key={permiso._id}
            permiso={permiso}
          />
        ))
      }
    </div>

    </>
  )
}

export default Permisos