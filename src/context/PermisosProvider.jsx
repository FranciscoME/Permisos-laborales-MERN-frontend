import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PermisosContext = createContext();

const PermisosProvider = ({ children }) => {

  const [params, setParams] = useSearchParams();

  const [permiso, setPermiso] = useState({});
  const [alerta, setAlerta] = useState({});
  const [permisos, setPermisos] = useState([]);
  const [cargandoPermiso, setCargandoPermiso] = useState(true);
  const [cargandoPermisos, setCargandoPermisos] = useState(true);

  const [desde, setDesde] = useState(0);
  const [limite, setLimite] = useState(5);
  const [totalPermisos, setTotalPermisos] = useState(0);

  const { auth } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    obtenerPermisos()
  }, [auth])

  useEffect(() => {
    obtenerPermisos()
  }, [desde])




  const obtenerPermisos = async () => {
    try {
      setCargandoPermisos(true);
      const token = localStorage.getItem('token');
      if (!token)
        return;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }


      const { data } = await clienteAxios.get(`/permisos?desde=${desde}&limite=${limite}`, config)
      // console.log(data.total);
      // console.log(data.permisos);
      setPermisos(data.permisos)
      setTotalPermisos(data.total);
      setCargandoPermisos(false);
      // console.log(data.total.value);

    } catch (error) {
      // console.log(error.response.data);
      setAlerta({
        msg: error.response.data,
        error: true
      })
      setCargandoPermisos(false)
    }
  }

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
        data,
        ...permisos
      ])

      navigate('/permisos');
      imprimirReciboPDF(data._id);
    } catch (error) {
      // console.log(error.response.data);
      setAlerta({
        msg: error.response.data,
        error: true
      })
    }

  }

  const consultarPermiso = async (id) => {
    setCargandoPermiso(true);
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

      const { data } = await clienteAxios.get(`/permisos/${id}`, config);
      // console.log(data);
      setPermiso(data);
    } catch (error) {
      setAlerta({
        msg: error.response.data,
        error: true
      })
    }
    setCargandoPermiso(false);

  }

  const eliminarPermiso = async (id) => {

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

      const { data } = await clienteAxios.delete(`/permisos/${id}`, config);


      const permisosActualizados = permisos.filter((permisoState) => permisoState._id !== id);
      setPermisos(permisosActualizados)
      navigate('/permisos')
    } catch (error) {
      // console.log(error);
      // setAlerta({
      //   msg: error.response.data,
      //   error: true
      // })
    }

  }

  const imprimirReciboPDF = async (id) => {

    try {
      const token = localStorage.getItem('token');
      if (!token)
        return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        responseType: 'blob',
      }

      const { data } = await clienteAxios.get(`/permisopdf/${id}`, config)
      // console.log(data);
      window.open(URL.createObjectURL(data));
      // console.log(data);

      // navigate('/permisos');
    } catch (error) {
      // console.log(error.response.data);
      setAlerta({
        msg: error.response.data,
        error: true
      })
    }

  }


  const cerrarSesionPermisos = ()=>{
    setPermisos([]);
    setDesde(0);
    setLimite(0);
    setTotalPermisos(0);
  }




  return (
    <PermisosContext.Provider
      value={{
        permiso,
        permisos,
        cargandoPermiso,
        desde,
        limite,
        totalPermisos,
        cargandoPermisos,
        obtenerPermisos,
        handleGuardarPermiso,
        consultarPermiso,
        setCargandoPermiso,
        eliminarPermiso,
        imprimirReciboPDF,
        setDesde,
        setLimite,
        cerrarSesionPermisos
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