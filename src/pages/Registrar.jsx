import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta'
import Loader from '../components/Loader/Loader';
import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';


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
const Registrar = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { consultarUsuario, userData, setUserData, cargandoModificar, setCargandoModificar, actualizarUsuario } = useAuth();

  // const [data, setData] = useState({
  //   nombre: '',
  //   email: '',
  //   password1: '',
  //   password2: '',
  //   departamento: '',
  //   turno: '',
  //   tarjeta:''
  // })

  const [alerta, setAlerta] = useState({});
  const [isUpdateUser, setIsUpdateUser] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }



  useEffect(() => {
    if (id) {
      consultarUsuario(id);
      setIsUpdateUser(true);
    }
    else {
      console.log('nuevo');
      setIsUpdateUser(false);
    }
  }, [])


  const { nombre, email, password1, password2, departamento, turno, tarjeta } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || email.trim() === '' || departamento.trim() === '' || turno.trim() === '' || tarjeta.trim() === '') {
      setAlerta({
        error: true,
        msg: 'Todos los campos son obligatorios'
      })
      // return console.log('no debe haber campos vacios');
    }

   


    if (isUpdateUser) {
      // Actualizar usuario
      console.log('actualizara');
      actualizarUsuario(userData);
      setUserData({
        nombre: '',
        email: '',
        departamento: '',
        turno: '',
        tarjeta: ''
      })

      setTimeout(() => {
        navigate('/permisos')
      }, 3000);


    } else {
      // Nuevo usuario
      console.log('creara nuevo user');
      if (password1.trim() === '' || password2.trim() === '') {
        setAlerta({
          error: true,
          msg: 'Todos los campos son obligatorios'
        })
      }

      if (password1 !== password2) {
        return console.log('las contraseñas no coinciden');
      }

      if (password1.trim().length<=5 || password2.trim().length<=5) {
        setAlerta({
          error: true,
          msg: 'El password debe tener una longitud minima de 5 caracteres'
        })
        return;
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

        setUserData({
          nombre: '',
          email: '',
          password1: '',
          password2: '',
          departamento: '',
          turno: '',
          tarjeta: ''
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }

      setTimeout(() => {
        navigate('/')        
      }, 1500);

    }




    // Nuevo usuario
    // if (nombre.trim() === '' || email.trim() === '' || password1.trim() === '' || password2.trim() === '' || departamento.trim() === '' || turno.trim() === '' || tarjeta.trim() === '') {
    //   setAlerta({
    //     error: true,
    //     msg: 'Todos los campos son obligatorios'
    //   })
    //   // return console.log('no debe haber campos vacios');
    // }

    // if (password1 !== password2) {
    //   return console.log('las contraseñas no coinciden');
    // }

    // try {
    //   const { data } = await clienteAxios.post('/usuarios', {
    //     nombre,
    //     email,
    //     password: password1,
    //     departamento,
    //     turno,
    //     tarjeta
    //   })

    //   setAlerta({
    //     msg: data.msg,
    //     error: false,
    //   })

    //   setUserData({
    //     nombre: '',
    //     email: '',
    //     password1: '',
    //     password2: '',
    //     departamento: '',
    //     turno: '',
    //     tarjeta: ''
    //   })

    // } catch (error) {
    //   setAlerta({
    //     msg: error.response.data.msg,
    //     error: true
    //   })
    // }

  }


  const msg = alerta.msg;

  useEffect(() => {
    if (msg !== '') {
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }
  }, [msg])

  if (cargandoModificar && isUpdateUser) {
    return (<Loader />)
  }

  return (
    <>
      {
        isUpdateUser ?
          (<h1 className='text-sky-600 font-black text-2xl capitalize text-center'>Actualiza tu usuario</h1>)
          : (<h1 className='text-sky-600 font-black text-2xl capitalize text-center'>Crea tu cuenta</h1>)
      }

      <form
        className='my-4 bg-white shadow rounded-sm p-10 ml-20 '
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
        {
          !isUpdateUser && (
            <>
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
            </>
          )
        }
        <div className='my-5'>
          <label
            htmlFor="departamento"
            className='uppercase block text-xl font-bold mb-2'>Departamento:</label>
          <select
            name="departamento"
            id="departamento"
            className='p-2 bg-slate-100'
            onChange={handleChange}
            value={departamento}
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
            className='p-2 bg-slate-100'
            value={turno}
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

          value={isUpdateUser ? 'Actualizar mis datos' : 'Registrarme'}
          className='mt-5 bg-sky-600 text-white p-3 rounded-xl hover:bg-sky-700 transition-colors w-full text-lg hover:cursor-pointer font-bold'
        />

      </form>

      {
        !isUpdateUser && (
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
        )

      }
    </>
  )
}

export default Registrar