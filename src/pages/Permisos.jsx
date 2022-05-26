import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader';
import PreviewPermiso from '../components/PreviewPermiso';
import usePermiso from '../hooks/usePermiso';

const Permisos = () => {
  const { permisos, totalPermisos, obtenerPermisos,cargandoPermisos ,desde, limite, setDesde } = usePermiso();

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
    obtenerPermisos();
  }

  const onPreviusPage = () => {
    setIncrementoPaginacion(pa => pa - 5)
    setDesde(incrementoPaginacion - 5)
    setPaginacionActual(pa=>pa-1)
    obtenerPermisos();
  }


  if(cargandoPermisos){
    return <Loader/>
  }



  return (

    <div className='m-10'>

      <h1
        className='ml-10 text-4xl font-black text-center mb-5'
      >Mis Permisos</h1>

      <div className='bg-white shadow  rounded-lg  md:m-10 '>
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
          className='bg-violet-500 text-white p-2 rounded-sm m-2'

        >
          Más actuales
        </button>
         )}

       {
         paginacionActual!==totalPaginas&&(
          <button
            type='button'
            onClick={onNextPage}
            className='bg-violet-500 text-white p-2 rounded-sm m-2'
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