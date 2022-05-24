import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta';
import Loader from '../components/Loader/Loader';
import useAuth from '../hooks/useAuth'


const departamentos = [
  , 'ARCHIVO'
  , 'ALMACÉN'
  , 'CALIDAD'
  , 'CONSULTA EXTERNA'
  , 'DENTAL'
  , 'ENFERMERÍA'
  , 'ESTADISTICA'
  , 'HOSPITALIZACIÓN'
  , 'INFORMATICA'
  , 'INTENDENCIA'
  , 'JURÍDICO'
  , 'LAVANDERÍA'
  , 'MANTENIMIENTO'
  , 'MODULO'
  , 'PSICOLOGÍA'
  , 'PSICOLOGÍA '
  , 'RECURSOS HUMANOS'
  , 'REHABILITACIÓN INTERNA'
  , 'SEGURO POPULAR'
  , 'SERVICIOS GENERALES'
  , 'TRABAJO SOCIAL'
  , 'URGENCIAS'
]

const turnos = [
  , 'MATUTINO'
  , 'JORNADA ACUMULADA'
  , 'VESPERTINO'
  , 'NOCTURNO A'
  , 'J.E. NOCTURNA'
  , 'NOCTURNA B'
  , 'NOCTURNO B'
  , 'NOCTURNO A '
  , 'NCTURNO A'
  , 'JORNADA ESPECIAL'

]


const ModificarUsuario = () => {

  const { id } = useParams();
  const {alerta,mostrarAlerta, cargandoModificar, userData, consultarUsuario, actualizarUsuario } = useAuth();


  // const [alerta, setAlerta] = useState('');

  const [userForm, setUserForm] = useState({})


  // consultarUsuario(id);
  useEffect(() => {
    consultarUsuario(id);
    // setUserForm(userData);    
  }, [])

  useEffect(() => {
    if (userData) {
      setUserForm(userData);
    }

  }, [userData])

  
  console.log('hola');

  useEffect(() => {
    if(Object.keys(alerta).length > 0){
      setTimeout(() => {
        mostrarAlerta({})
      },4000)
    }
  }, [alerta])
  



  // console.log(userData);
  const { departamento, nombre, email, tarjeta, turno, _id } = userForm;

  if (cargandoModificar) {
    return (<Loader />)
  }

  // console.log(userForm);

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (departamento.trim() === '' || nombre.trim() === '' || email.trim() === '' || tarjeta.trim() === '' || turno.trim() === '') {
      mostrarAlerta({
        msg:'Todos los campos son obligatorios',
        error:true
      })
    }

    actualizarUsuario(userForm)

    setUserForm({nombre: '',
    email: '',
    departamento: '',
    tarjeta: '',
    turno: ''});

  }

  const {msg}=alerta;

  return (
    <div>
      <h1 className='text-sky-600 font-black text-2xl capitalize text-center'>Modifica tu cuenta</h1>

      <form
        className='my-4 bg-white shadow rounded-sm p-10'
        onSubmit={handleSubmit}
      >
        {
          msg&&<Alerta alerta={alerta} />
        }
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
            name='email'
            placeholder='email'
            value={email}
            onChange={handleChange}
            className='mt-3 p-3 bordr rounded-xl bg-gray-50 w-full'
          />
        </div>
        {/* <div className='my-5'>
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
        </div> */}
        {/* <div className='my-5'>
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
        </div> */}
        <div className='my-5'>
          <label
            htmlFor="departamento"
            className='uppercase block text-xl font-bold mb-2'>Departamento:</label>
          <select
            name="departamento"
            id="departamento"
            className='p-2 bg-slate-100'
            value={departamento}
            onChange={handleChange}
          >
            <option value="">--Selecciona un departamento--</option>
            {
              departamentos.map(departamento => (
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
            value={turno}
            className='p-2 bg-slate-100'
          >
            <option value="">-Selecciona un turno--</option>
            {
              turnos.map(turno => (
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
          value='Actualizar mis datos'
          className='mt-5 bg-sky-600 text-white p-3 rounded-xl '
          onSubmit={handleSubmit}
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

    </div>
  )
}

export default ModificarUsuario