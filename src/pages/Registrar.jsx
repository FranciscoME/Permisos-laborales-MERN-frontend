import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios';
import axios from 'axios';

const Registrar = () => {

  const [data, setData] = useState({
    nombre: '',
    email: '',
    password1: '',
    password2: '',
    departamento: ''
  })

  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const { nombre, email, password1, password2, departamento } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre === '' || email === '' || password1 === '' || password2 === '' || departamento === '') {
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
        departamento
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
        departamento: ''
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
            className='uppercase block text-xl font-bold'>Concepto:</label>
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
            className='uppercase block text-xl font-bold'>Email:</label>
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
            className='uppercase block text-xl font-bold'>Contrasena:</label>
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
            className='uppercase block text-xl font-bold'>Repetir contrasena:</label>
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
            className='uppercase block text-xl font-bold'>Departamento:</label>
          <input
            type="text"
            id='departamento'
            placeholder='Rh, Psiquiatria, etc'
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
            value={departamento}
            name='departamento'
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          value='Registrar'
          className='mt-5 bg-sky-600 text-white p-3 rounded-xl'
        />

      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
          to="/"
          className="block text-center text-white uppercase text-sm font-bold mb-3"
        >
          Ya tienes cuenta? Inicia Sesion
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