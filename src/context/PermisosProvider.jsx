import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const PermisosContext = createContext();

const PermisosProvider = ({ children }) => {

  const [permiso, setPermiso] = useState({});
  const [alerta, setAlerta] = useState({});
  const [permisos, setPermisos] = useState([]);
  const [cargandoPermiso, setCargandoPermiso] = useState(true);

  const { auth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {

    const obtenerPermisos = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token)
          return;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios.get('/permisos', config)
        setPermisos(data)
      } catch (error) {
        // console.log(error.response.data);
        setAlerta({
          msg: error.response.data,
          error: true
        })
      }
    }
    obtenerPermisos()
  }, [auth])


  const handleGuardarPermiso = async (permiso) => {
    // console.log(permiso);
    try {
      const token = localStorage.getItem('token');
      if (!token)
        return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await clienteAxios.post('/permisos', permiso, config)
      // setPermiso(data)
      setPermisos([
        ...permisos,
        data
      ])

      navigate('/permisos');
    } catch (error) {
      // console.log(error.response.data);
      setAlerta({
        msg: error.response.data,
        error: true
      })
    }

  }

  const consultarPermiso = async (id)=>{
    try {
      const token = localStorage.getItem('token');
      if (!token)
        return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      
      const {data} = await clienteAxios.get(`/permisos/${id}`,config);
      // console.log(data);
      setPermiso(data);
    } catch (error) {
      
    }
    
    
  }

  const eliminarPermiso = async(id)=>{

    try {
      const token = localStorage.getItem('token');
      if (!token)
        return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.delete(`/permisos/${id}`,config);

      
      const permisosActualizados = permisos.filter((permisoState)=> permisoState._id !== id );
      setPermisos(permisosActualizados)
      navigate('/permisos')
    } catch (error) {
      console.log(error);
      // setAlerta({
      //   msg: error.response.data,
      //   error: true
      // })
    }
  
  }



  return (
    <PermisosContext.Provider
      value={{
        permiso,
        permisos,
        cargandoPermiso,
        handleGuardarPermiso,
        consultarPermiso,
        setCargandoPermiso,
        eliminarPermiso
      }}
    >
      {children}
    </PermisosContext.Provider>
  )

}

export {
  PermisosProvider
}

export default PermisosContext;