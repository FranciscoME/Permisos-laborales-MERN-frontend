import React, { useEffect, useState } from 'react'
import CheckBox from '../components/CheckBox';
import FormularioPermiso from '../components/FormularioPermiso';
import { diasEntreFechas } from '../helpers/fechas'
import formatearFecha from '../helpers/formatearFecha';

const NuevoPermiso = () => {

  

  // const mostrarArray = ()=>{
  //   let ordenado =fechasSeleccionadas.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  //   console.log(ordenado);
  // }

  return (
    <div className='m-10'>
       <h1
        className='ml-10 text-4xl font-black text-center mb-5'
      >Crear nuevo permiso</h1>
{/* 
      <button
      onClick={mostrarArray}
      >
        consultaArray
      </button> */}

      <FormularioPermiso/>

    </div>
  )
}

export default NuevoPermiso