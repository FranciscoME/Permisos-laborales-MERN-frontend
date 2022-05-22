import React, { useEffect, useState } from 'react'
import { diasEntreFechas, getYears } from '../helpers/fechas';
import formatearFecha from '../helpers/formatearFecha';
import useAuth from '../hooks/useAuth';
import usePermiso from '../hooks/usePermiso';


const arrayPermisos = [
  'Pase de salida',
  'Pase de salida sin retorno',
  'Permiso economico',
  'Vacaciones 1er periodo',
  'Vacaciones 2o Periodo',
  'Vacaciones por Concepto 30',
  'Onomastico o Cumpleanos',
  'Otro'
]

const anioActual= getYears()[0].toString();

const FormularioPermiso = () => {

  const { auth } = useAuth();
  const { nombre } = auth;

  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [arrayFechas, setArrayFechas] = useState([]);
  const [arrayAnios, setArrayAnios] = useState([]);
  const [anioSeleccionado, setAnioSeleccionado] = useState('');
  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);
  const [fechaUnica, setFechaUnica] = useState('');
  const [fechaDeElaboracion, setFechaDeElaboracion] = useState('');
  const [permiso, setPermiso] = useState('');
  const [tipoFechaMenu, setTipoFechaMenu] = useState('');
  const [nota, setNota] = useState('')

  const { handleGuardarPermiso } = usePermiso();



  useEffect(() => {
    if (fechaInicial !== '' && fechaFinal !== '') {
      const fechas = diasEntreFechas(fechaInicial, fechaFinal);
      setArrayFechas(fechas);
    }

  }, [fechaInicial, fechaFinal])


  useEffect(() => {
    if (permiso === 'Pase de salida' || permiso === 'Pase de salida sin retorno' || permiso === 'Onomastico o Cumpleanos' || permiso === '') {
      setTipoFechaMenu('uno')
      setFechaInicial('')
      setFechaFinal('')
      setFechasSeleccionadas('')
    }
    else {
      setTipoFechaMenu('dos')
      setFechaUnica('');
      setArrayAnios(getYears());
      setAnioSeleccionado(anioActual);
    }
    setArrayFechas([]);



  }, [permiso])

  useEffect(() => {
    setFechaDeElaboracion(new Date().toISOString().split('T')[0])
  }, [])
  




  // console.log(fechas);

  const handleChecked = (e) => {
    // console.log(e.target.value);
    // console.log(e.target);
    // console.log(e.target.checked);

    if (e.target.value !== '' && e.target.checked === true) {
      setFechasSeleccionadas([
        ...fechasSeleccionadas,
        e.target.value
      ])
    }
    else {
      let fs = [...fechasSeleccionadas].filter((fechaState) => fechaState !== e.target.value);
      setFechasSeleccionadas(
        fs
      )
    }

    // console.log(fechasSeleccionadas);
  }

  const handlePermiso = (e) => {
    setPermiso(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    let data;
    if (permiso === 'Pase de salida' || permiso === 'Pase de salida sin retorno' || permiso === 'Onomastico o Cumpleanos' || permiso === '') {
      data = {
        concepto: permiso,
        notas: nota,
        fechas: fechaUnica,
        fechaCreacion: fechaDeElaboracion
      }
    } else {
      data = {
        concepto: `${permiso} / ${anioSeleccionado}`,
        notas: nota,
        fechas: fechasSeleccionadas,
        fechaCreacion: fechaDeElaboracion
      }
    }

    // console.log(data);
    handleGuardarPermiso(data);
    
  }



  return (
    <>

      <form
        className='bg-white py-10 px-5 md:1/2 rounded-gl'
        onSubmit={handleSubmit}
      >
        <div className='mb-5'>
          <label htmlFor="nombre"
            className='text-gray-700 uppercase font-bold text-sm shadow'
          >{nombre}</label>
        </div>

        <fieldset>
          <legend>Que tipo de permiso requieres?</legend>
          <select
            name='permiso'
            className='bg-gray-300 m-1 p-2'
            onChange={handlePermiso}
          >
            <option value='' >--Selecciona un Permiso--</option>
            {
              arrayPermisos.map(permiso => (
                <option
                  key={permiso}
                  value={permiso}
                >{permiso}</option>
              ))
            }
          </select>
        </fieldset>

        {
          tipoFechaMenu==='dos'?(
            <fieldset>
              
                <legend>Selecciona el año</legend>
                <select
                  name='anioVacaciones'
                  className='bg-gray-300 m-1 p-2'
                  onChange={(e)=>setAnioSeleccionado(e.target.value)}
                  defaultValue={anioSeleccionado}
                >
                  {
                    arrayAnios.map(permiso => (
                      <option
                        key={permiso}
                        value={permiso}
                      >{permiso}</option>
                    ))
                  }
                </select>
              </fieldset>
          ):null
        }

        {tipoFechaMenu === 'dos'
          ? (
            <div>

              <label
                htmlFor="fecha-inicial"
              >Selecciona la fecha Inicial </label>
              <input
                type="date"
                id='fecha-incial'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                onChange={(e) => setFechaInicial(e.target.value)}
              />
              <label
                htmlFor="fecha-inicial"
              >Selecciona la fecha Final </label>
              <input type="date"
                id='fecha-final'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'

                onChange={(e) => setFechaFinal(e.target.value)}
              />

              {/* <fieldset>
                <legend>Selecciona el año de las vacaciones</legend>
                <select
                  name='permiso'
                  className='bg-gray-300 m-1 p-2'
                  onChange={handlePermiso}
                >
                  {
                    arrayAnios.map(permiso => (
                      <option
                        key={permiso}
                        value={permiso}
                      >{permiso}</option>
                    ))
                  }
                </select>
              </fieldset> */}

            </div>
          )
          : (
            <div>

              <input type="date"
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'

                onChange={(e) => setFechaUnica(e.target.value)}
              />
            </div>
          )
        }

        <fieldset>
          {
            (arrayFechas.length > 0) && (
              <legend
                className='font-bold m-4 text-2xl'
              >Selecciona las fechas que requieres:</legend>
            )
          }

          {
            arrayFechas.map((fecha) => (



              <div
                key={fecha}
              >
                <input
                  type="checkbox"
                  id={fecha}
                  name="fecha"
                  value={fecha}
                  onChange={handleChecked}
                  className='m-2'
                />
                <label
                  className='p-2 mt-4 bottom-1 font-bold border-b-1 '
                  htmlFor={fecha}>{formatearFecha(fecha)}
                </label>
              </div>
            ))
          }

        </fieldset>

        <div className='mb-3'>
          <label htmlFor="notas">Notas:</label>
          <textarea
            id='notas'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-sm'
            placeholder='Agrega notas sobre tu permiso'
            onChange={(e) => setNota(e.target.value)}
          />

        </div>

        <div className='mb-3'>
        <label
                htmlFor="fecha-elaboracion"
              >Selecciona la fecha de elaboracion: </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                id='fecha-elaboracion'
                name="fecha-elaboracion"
                className='border-2 w-full p-2 mt-2  rounded-md'
                onChange={(e) => setFechaDeElaboracion(e.target.value)}
              />
        </div>

        <input
          type='submit'
          value='Solicitar permiso'
          className='bg-sky-600 uppercase p-2 font-bold text-white rounded cursor-pointer hover:bg-sky-700'
        />
      </form>
    </>

  )
}

export default FormularioPermiso