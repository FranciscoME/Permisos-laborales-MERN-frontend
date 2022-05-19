import React from 'react'

const CheckBox = ({label, value, onChange}) => {
  return (
    <div>
    <label>
      <input type="checkbox" checked={value} onChange={onChange}/>
      {label}
    </label>
    </div>
  )
}

export default CheckBox