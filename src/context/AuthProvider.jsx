import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [cargandoModificar, setCargandoModificar] = useState(true);
  const [alerta, setAlerta] = useState({});
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    departamento: '',
    tarjeta: '',
    turno: '',
    password1: '',
    password2: '',
  });
  // const navigate = useNavigate();

  useEffect(() => {

    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setCargando(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      }

      try {
        const { data } = await clienteAxios.get('/usuarios/perfil', config);


        setAuth(data);
      } catch (error) {
        setAuth({})
      }
      finally {
        setCargando(false)
      }

    }
    autenticarUsuario();
  }, [])

  

  const consultarUsuario = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await clienteAxios.get(`/usuarios/obtener-usuario/${id}`, config);
      setUserData(data);

      // setAuth(data);
    } catch (error) {
      setAuth({})
    }
    finally {
      setCargandoModificar(false)
    }
  }


  const actualizarUsuario = async (usuario) => {
    const token = localStorage.getItem('token');

    // console.log(usuario);
    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      }
    }

    try {
      const { data } = await clienteAxios.put(`/usuarios/actualizar-usuario`, usuario, config);
      
      // setUserData(data);

      // setAuth(data);
    } catch (error) {
      console.log(error);
      // setAuth({})
    }
    
  }

  const mostrarAlerta = (alerta)=>{
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 4000);
  }

  const cerrarSesionAuth = () => {
    setAuth({});
    setAlerta({});
    setUserData({
      nombre: '',
      email: '',
      departamento: '',
      tarjeta: '',
      turno: '',
      password1: '',
      password2: '',
    });
    localStorage.removeItem('token');
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        cargandoModificar,
        userData,
        alerta,
        setAuth,
        setUserData,
        consultarUsuario,
        actualizarUsuario,
        mostrarAlerta,
        cerrarSesionAuth,

      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthProvider
}

export default AuthContext;