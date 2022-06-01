import React, { useEffect } from 'react'
import usePermiso from '../hooks/usePermiso'
import { Link, useParams } from 'react-router-dom'
import formatearFecha from '../helpers/formatearFecha';
import Loader from '../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

const DetallePermiso = () => {
  const { permiso, consultarPermiso, cargandoPermiso, setCargandoPermiso, eliminarPermiso, imprimirReciboPDF } = usePermiso();

  const params = useParams();
  const { id } = params;
  // console.log(id);


  useEffect(() => {
    consultarPermiso(id);
    // setCargandoPermiso(false);
  }, [id])
  // console.log(cargandoPermiso);

  if (cargandoPermiso) {
    return (<Loader/>)
  }

  const { concepto, fechaCreacion, fechas, notas, _id } = permiso;
  // console.log(permiso);
  // console.log(_id);

  const handleEliminarPermiso = () => {

    const respuesta=confirm('Deseas eliminar este permiso?')
    if(respuesta){
      eliminarPermiso(_id)
    }
  }

  const handleReimprimirRecibo = () => {
    imprimirReciboPDF(_id);
    toast.success('Reimprimiendo tu permiso.. espera.')
  }


  return (
    <div className='md:ml-10 w-full bg-slate-50  mt-10 flex flex-col items-center rounded-lg shadow-sm'>
      <Toaster/>

      <p className='text-2xl font-semibold text-center'>Tipo de permiso <span className='text-sky-600 block'>{concepto}</span> </p>
      {/* <p>{permiso?.fechaCreacion}</p> */}
      {permiso.fechaCreacion
        ? <p className='font-semibold text-center mt-4'>Fecha de elaboracion<span className='text-gray-500 block'>{formatearFecha(permiso.fechaCreacion)}</span> </p>
        : null}

      <p className='font-semibold text-center mt-4'>Fechas solicitadas:</p>
      {
        permiso.concepto && (

          permiso.fechas.map(fecha => (
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
        <p className='p-3 bg-slate-200'>{notas}</p>
      }

        <div className='bg-yellow-300 md:8/12 font-bold p-2 mb-4 rounded-md m-2 flex justify-items-center items-center'>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
        <Link
          className=''
          to={`/permisos`}
        >
          Regresar</Link>
        </div>


      <button
        className='bg-sky-500 md:8/12 font-bold p-2 mb-4 rounded-md m-2 flex  text-white'
        onClick={handleReimprimirRecibo}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex justify-center" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>

        Reimprimir permiso
      </button>

      {/* <button
        className='bg-yellow-300 md:8/12 font-bold p-2 mb-4 rounded-md m-2 '
      >
       
        Solicitar cancelacion del permiso
      </button> */}

      <button
        className='bg-red-400 md:8-12 font-bold p-2 rounded-md m-2 flex text-gray-100'
        onClick={handleEliminarPermiso}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Eliminar permiso
      </button>


    </div>
  )
}

export default DetallePermiso