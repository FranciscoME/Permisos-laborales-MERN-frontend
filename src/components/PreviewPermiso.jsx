import React from 'react'
import { Link } from 'react-router-dom';
import formatearFecha from '../helpers/formatearFecha';

const PreviewPermiso = ({permiso}) => {
  // console.log(permiso);
  const {concepto,notas,fechaCreacion,_id}=permiso;
  return (
    <div className='p-2 rounded-sm m-5 border-b-2 border-gray-500 shadow-lg  md:flex-row md:justify-between flex flex-col'>

      <div className=''>
        <h3 className='font-bold text-center text-2xl '>{concepto}</h3>
        <p className='font-bold mt-4'>Fecha: <span className='font-normal'>{formatearFecha(fechaCreacion)}</span></p>
      </div>

      <div className='flex flex-col'>
        <Link
          to={`/permisos/detalles-permiso/${_id}`}
          className='m-2 bg-sky-500 rounded-lg p-2 text-white font-bold hover:bg-sky-600 transition-colors text-center md:p-3 w-3/4 md:w-full mx-auto'
        >Ver detalles</Link>        
      </div>
    </div>
  )
}

export default PreviewPermiso