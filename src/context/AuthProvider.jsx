import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const [cargandoModificar, setCargandoModificar] = useState(true);
  const [userData, setUserData] = useState({ nombre:'',
  email:'',
  departamento:'',
  tarjeta:'',
  turno:''});
  // const navigate = useNavigate();

  useEffect(() => {
    const autenticarUsuario = async()=>{
      const token = localStorage.getItem('token');

      if(!token){
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
        const {data} = await clienteAxios.get('/usuarios/perfil',config);
      
        
        setAuth(data);
      } catch (error) {
        setAuth({})
      }
      finally{
        setCargando(false)
      }

    }
    autenticarUsuario();
  }, [])


  const consultarUsuario = async (id)=>{
    const token = localStorage.getItem('token');

      if(!token){
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
        const {data} = await clienteAxios.get(`/usuarios/obtener-usuario/${id}`,config);
        setUserData(data);     
        
        // setAuth(data);
      } catch (error) {
        setAuth({})
      }
      finally{
        setCargandoModificar(false)
      }
  }
  
  const cerrarSesionAuth = ()=>{
    setAuth({});
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        cargandoModificar,
        userData,
        setAuth,
        setUserData,
        consultarUsuario
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