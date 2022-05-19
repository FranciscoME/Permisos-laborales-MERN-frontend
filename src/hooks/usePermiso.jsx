import { useContext } from "react"
import PermisosContext  from "../context/PermisosProvider"

const usePermiso = ()=>{
    return useContext(PermisosContext);
}

export default usePermiso;