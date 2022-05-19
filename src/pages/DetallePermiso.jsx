import React, { useEffect } from 'react'
import usePermiso from '../hooks/usePermiso'
import { useParams } from 'react-router-dom'
import formatearFecha from '../helpers/formatearFecha';

const DetallePermiso = () => {
  const { permiso, consultarPermiso, cargandoPermiso, setCargandoPermiso,eliminarPermiso } = usePermiso();

  const params = useParams();
  const { id } = params;
  // console.log(id);


  useEffect(() => {
    consultarPermiso(id);
    setCargandoPermiso(false);
  }, [])
  // console.log(cargandoPermiso);

  if (cargandoPermiso) {
    return 'Cargando...'
  }

  const { concepto, fechaCreacion, fechas, notas,_id } = permiso;
  // console.log(permiso);
  // console.log(_id);

  const handleEliminarPermiso = ()=>{
    eliminarPermiso(_id)
  }


  return (
    <div className='mx-40 w-full bg-slate-50  mt-10 flex flex-col items-center'>
      <p className='text-2xl font-semibold text-center'>Tipo de permiso <span className='text-sky-600 block'>{concepto}</span> </p>
      {/* <p>{permiso?.fechaCreacion}</p> */}
      {permiso.fechaCreacion
        ? <p className='font-semibold text-center mt-4'>Fecha de elaboracion<span className='text-gray-500 block'>{formatearFecha(permiso.fechaCreacion)}</span> </p>
        : null}

      <p className='font-semibold text-center mt-4'>Fechas solicitadas:</p>
      {
        permiso.concepto && (

          permiso?.fechas.map(fecha => (
            <p
              key={fecha}
              className='rounded-sm m-2 border-b-2'
            >{formatearFecha(fecha)}</p>
          ))

        )
      }

      <p className='font-semibold text-center mt-4'>Notas</p>
      {
        permiso.concepto &&
        <p className='p-3'>{notas}</p>
      }

      <button
        className='bg-sky-500 md:w-full font-bold p-2 mb-4'
        >
        Reimprimir permiso
      </button>

      <button
        className='bg-yellow-300 md:w-full font-bold p-2 mb-4'
        >
        Solicitar cancelacion del permiso
      </button>

      <button
        className='bg-red-300 md:w-full font-bold p-2'
        onClick={handleEliminarPermiso}
      >
        Eliminar permiso
      </button>


    </div>
  )
}

export default DetallePermiso