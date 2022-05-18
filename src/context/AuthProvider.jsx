import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
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
        // console.log(data);
        
        setAuth(data.usuario);
      } catch (error) {
        setAuth({})
      }
      finally{
        setCargando(false)
      }

    }
    autenticarUsuario();
  }, [])
  
  const cerrarSesionAuth = ()=>{
    setAuth({});
  }


  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth
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