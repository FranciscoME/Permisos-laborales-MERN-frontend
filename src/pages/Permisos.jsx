import React, { useEffect, useState } from 'react'
import PreviewPermiso from '../components/PreviewPermiso';
import usePermiso from '../hooks/usePermiso';

const Permisos = () => {
  const { permisos, totalPermisos, obtenerPermisos, desde, limite, setDesde } = usePermiso();

  const [totalPaginas, setTotalPaginas] = useState();
  const [incrementoPaginacion, setIncrementoPaginacion] = useState(0);
  const [paginacionActual, setPaginacionActual] = useState(0);
  // const [esUltimaPagina, setEsUltimaPagina] = useState(false);
  // const [esPrimeraPagina, setEsPrimeraPagina] = useState(true);

  useEffect(() => {
    const noPaginas = Math.ceil(totalPermisos / limite)
    setTotalPaginas(noPaginas - 1)
  }, [totalPermisos])


  const onNextPage = () => {
    setIncrementoPaginacion(pa => pa + 5);
    setDesde(incrementoPaginacion + 5);
    setPaginacionActual(pa=>pa+1)
    // if(totalPaginas)
    obtenerPermisos();
  }

  const onPreviusPage = () => {
    setIncrementoPaginacion(pa => pa - 5)
    setDesde(incrementoPaginacion - 5)
    setPaginacionActual(pa=>pa-1)

    obtenerPermisos();
  }


  


  return (


    <div className='m-10'>

      <h1
        className='ml-10 text-4xl font-black text-center'
      >Mis Permisos</h1>

      <div className='bg-white shadow  rounded-lg  m-10 '>
        {
          permisos.map((permiso) => (
            <PreviewPermiso
              key={permiso._id}
              permiso={permiso}
            />
          ))
        }
      </div>

      <div className='flex justify-around'>
        {paginacionActual !==0 && (

        <button
          type='button'
          onClick={onPreviusPage}

        >
          Más actuales
        </button>
         )}

       {
         paginacionActual!==totalPaginas&&(
          <button
            type='button'
            onClick={onNextPage}
          >
            Anteriores
          </button>
          )
       }
        
        

      </div>
    </div>

  )
}

export default Permisos