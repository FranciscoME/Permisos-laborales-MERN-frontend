import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [dataLogin, setDataLogin] = useState({
    email: '',
    password: ''
  })

  const [alerta, setAlerta] = useState({});

  const { email, password } = dataLogin;

  const handleChange = (e) => {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    try {
      const { data } = await clienteAxios.post(`/usuarios/login`, { email, password });
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/permisos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta;
  useEffect(() => {
    if (msg !== '') {
      setTimeout(() => {
        setAlerta({});
      }, 4000);
    }
  }, [msg])


  return (
    <>
      <h1 className='text-sky-600 font-black text-2xl capitalize text-center'>Inicia Sesión</h1>

      <form
        className='my-4 bg-white shadow rounded-sm p-10'
        onSubmit={handleSubmit}
      >
        <Alerta alerta={alerta} />
        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase block text-xl font-bold'>Email:</label>
          <input
            type="text"
            id='email'
            placeholder='Ej: correo@gmail.com'
            value={email}
            name='email'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        <div className='my-5'>
          <label
            htmlFor="email"
            className='uppercase block text-xl font-bold'>Contraseña:</label>
          <input
            type="password"
            id='password'
            placeholder='**'
            value={password}
            name='password'
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>


        <input
          type="submit"
          value='Iniciar sesión'
          className='mt-5 bg-sky-600 text-white p-3 rounded-xl hover:bg-sky-700 transition-colors w-full text-lg'
        />

      </form>
      <nav className='lg:flex lg:justify-between'>
        <Link
          to="/registrar"
          className="block text-center text-white uppercase text-sm font-bold mb-3"
        >
          Aun no tienes una cuenta? Creala ahora
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

export default Login