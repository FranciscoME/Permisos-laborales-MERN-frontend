import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={alerta.error ?'bg-red-300' :`bg-sky-400`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta