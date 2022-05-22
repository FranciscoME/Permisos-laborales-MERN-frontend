import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios';
import axios from 'axios';


const departamentos = [
,'ARCHIVO'
,'ALMACÉN'
,'CALIDAD'
,'CONSULTA EXTERNA'
,'DENTAL'
,'ENFERMERÍA'
,'ESTADISTICA'
,'HOSPITALIZACIÓN'
,'INFORMATICA'
,'INTENDENCIA'
,'JURÍDICO'
,'LAVANDERÍA'
,'MANTENIMIENTO'
,'MODULO'
,'PSICOLOGÍA'
,'PSICOLOGÍA '
,'RECURSOS HUMANOS'
,'REHABILITACIÓN INTERNA'
,'SEGURO POPULAR'
,'SERVICIOS GENERALES'
,'TRABAJO SOCIAL'
,'URGENCIAS'
]

const turnos=[
,'MATUTINO'
,'JORNADA ACUMULADA'
,'VESPERTINO'
,'NOCTURNO A'
,'J.E. NOCTURNA'
,'NOCTURNA B'
,'NOCTURNO B'
,'NOCTURNO A '
,'NCTURNO A'
,'JORNADA ESPECIAL'

]
const Registrar = () => {

  const [data, setData] = useState({
    nombre: '',
    email: '',
    password1: '',
    password2: '',
    departamento: '',
    turno: '',
    tarjeta:''
  })

  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const { nombre, email, password1, password2, departamento, turno, tarjeta } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || email.trim() === '' || password1.trim() === '' || password2.trim() === '' || departamento.trim() === '' || turno.trim() === '' || tarjeta.trim() === '') {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      // return console.log('no debe haber campos vacios');
    }

    if (password1 !== password2) {
      return console.log('las contraseñas no coinciden');
    }

    try {
      const { data } = await clienteAxios.post('/usuarios', {
        nombre,
        email,
        password: password1,
        departamento,
        turno,
        tarjeta
      })

      setAlerta({
        msg: data.msg,
        error: false,
      })

      setData({
        nombre: '',
        email: '',
        password1: '',
        password2: '',
        departamento: '',
        turno: '',
        tarjeta:''
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }


  const msg = alerta.msg;

  useEffect(() => {
    if (msg !== '') {
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }
  }, [msg])

  return (
    <>
      <h1 className='text-sky-600 font-black text-2xl capitalize text-center'>Crea tu cuenta</h1>

      <form
        className='my-4 bg-white shadow rounded-sm p-10'
        onSubmit={handleSubmit}
      >
        <Alerta alerta={alerta} />
        <div className='my-5'>
          <label
            htmlFor="nombre"
            className='uppercase block text-xl font-bold'>Nombre:</label>
          <input
            type="text"
            id='nombre'
            placeholder='Nombre'
            value={nombre}
            name='nombre'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase block text-xl font-bold'>Correo electronico:</label>
          <input
            type="email"
            id='email'
            placeholder='email'
            value={email}
            name='email'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor="password1"
            className='uppercase block text-xl font-bold'>Contraseña:</label>
          <input
            type="password"
            id='password1'
            placeholder='password'
            value={password1}
            name='password1'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor="password2"
            className='uppercase block text-xl font-bold'>Repetir contraseña:</label>
          <input
            type="password"
            id='password2'
            placeholder='Repite password'
            name='password2'
            value={password2}
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor="departamento"
            className='uppercase block text-xl font-bold mb-2'>Departamento:</label>
            <select 
            name="departamento" 
            id="departamento"
            className='p-2 bg-slate-100'
              onChange={handleChange}
            >
              <option value="">--Selecciona un departamento--</option>
              {
                departamentos.map(departamento=>(
                  <option
                  key={departamento}
                  value={departamento}
                  >
                    {departamento}
                  </option>
                ))
              }
            </select>
       
        </div>

        <div className='my-5'>
          <label
            htmlFor="turno"
            className='uppercase block text-xl font-bold mb-2'>Turno:</label>
            <select
              onChange={handleChange}            
              name='turno'
              className='p-2 bg-slate-100'
            >
              <option value="">-Selecciona un turno--</option>
              {
                turnos.map(turno=>(
                  <option
                    key={turno}
                    value={turno}
                  >
                    {turno}
                  </option>
                ))
              }
            </select>          
        </div>

        <div className='my-5'>
          <label
            htmlFor="tarjeta"
            className='uppercase block text-xl font-bold'> No. de tarjeta:</label>
          <input
            type="number"
            id='tarjeta'
            placeholder='Ejemplo.. 568'
            value={tarjeta}
            name='tarjeta'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>

        <input
          type="submit"
          value='Registrarme'
          className='mt-5 bg-sky-600 text-white p-3 rounded-xl '
        />

      </form>
      <nav className='lg:flex text-center flex-col'>
        <Link
          to="/"
          className="block text-center text-white uppercase text-sm font-bold mb-3"
        >
          Si ya tienes creada una cuenta cuenta, da click aqui para iniciar Sesion
        </Link>

        {/* <Link
        to="/olvide-password"
        className="block text-center text-slate-500 uppercase text-sm"
        >
          Olvide mi password
        </Link> */}
      </nav>
    </>
  )
}

export default Registrar