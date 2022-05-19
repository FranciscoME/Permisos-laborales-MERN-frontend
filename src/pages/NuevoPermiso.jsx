import React, { useEffect, useState } from 'react'
import CheckBox from '../components/CheckBox';
import FormularioPermiso from '../components/FormularioPermiso';
import { diasEntreFechas } from '../helpers/fechas'
import formatearFecha from '../helpers/formatearFecha';

const NuevoPermiso = () => {

  

  const mostrarArray = ()=>{
    let ordenado =fechasSeleccionadas.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    console.log(ordenado);
  }

  return (
    <div>
      

      <button
      onClick={mostrarArray}
      >
        consultaArray
      </button>

      <FormularioPermiso/>

    </div>
  )
}

export default NuevoPermiso