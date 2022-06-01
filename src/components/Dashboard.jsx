import React, { useEffect } from 'react'
import usePermiso from '../hooks/usePermiso'
import Loader from './Loader/Loader';

const Dashboard = () => {

  const {cargandoDatosGenerales,datosGenerales,consultarDatosGenerales}= usePermiso();

  const {pasesSalida,economicos}= datosGenerales;

  useEffect(() => {
    consultarDatosGenerales();
  }, [])
  

  if(cargandoDatosGenerales){
    return <Loader/>
  }


  return (
    <div className='flex'>

    <div className='bg-green-400 p-2 rounded-md font-bold md:w-2/8 m-1'>
      <p>PSSR: <span>{pasesSalida}</span> </p>
    </div>
    <div className='bg-indigo-400 p-2 rounded-md font-bold md:w-2/8 m-1'>
      <p>ECO: <span>{economicos}</span> </p>
    </div>

    </div>
  )
}

export default Dashboard