import React, { useEffect, useState } from 'react'
import { diasEntreFechas } from '../helpers/fechas'
import formatearFecha from '../helpers/formatearFecha';

const NuevoPermiso = () => {

  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [arrayFechas, setArrayFechas] = useState([])



  useEffect(() => {
    const fechas = diasEntreFechas(fechaInicial, fechaFinal);
    setArrayFechas(fechas);

  }, [fechaInicial, fechaFinal])



  // console.log(fechas);

  return (
    <div>
      <div>
        <input type="date"
          onChange={(e) => setFechaInicial(e.target.value)}
        />
        <input type="date"
          onChange={(e) => setFechaFinal(e.target.value)}
        />
      </div>

      <form
      >


        <fieldset>
          <legend>Selecciona las fechas que requieres</legend>

          {
            arrayFechas.map((fecha) => (

              <div>
                <input 
                type="checkbox" 
                id={fecha} 
                name="horns" 
                value={fecha}                
                on
                />
                <label htmlFor={fecha}>{formatearFecha(fecha)}</label>
              </div>
            ))
          }

        </fieldset>

      </form>

    </div>
  )
}

export default NuevoPermiso