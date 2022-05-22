import React from 'react'
import { Link } from 'react-router-dom';
import formatearFecha from '../helpers/formatearFecha';

const PreviewPermiso = ({permiso}) => {
  // console.log(permiso);
  const {concepto,notas,fechaCreacion,_id}=permiso;
  return (
    <div className='p-4 rounded-sm m-2 border-b-2 border-indigo-500 shadow-2xl  flex justify-between '>
      <div className=''>
        <h3 className='font-bold text-center text-2xl'>{concepto}</h3>
        <p className='font-bold mt-4'>Fecha: <span className='font-normal'>{formatearFecha(fechaCreacion)}</span></p>
      </div>
      <div className='flex flex-col ml-2'>
        <Link
          to={`/permisos/detalles-permiso/${_id}`}
          className='m-2 bg-sky-400 rounded-sm p-2'
        >Ver detalles</Link>
        {/* <Link
          to='/'
          className='m-2 bg-red-500 rounded-sm text-center p-2'
        >Eliminar</Link> */}
      </div>
    </div>
  )
}

export default PreviewPermiso