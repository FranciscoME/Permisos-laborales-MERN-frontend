import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthProvider'
import { PermisosProvider } from './context/PermisosProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import DetallePermiso from './pages/DetallePermiso'
import Login from './pages/Login'
import ModificarUsuario from './pages/ModificarUsuario'
import NuevoPermiso from './pages/NuevoPermiso'
import Permisos from './pages/Permisos'
import Registrar from './pages/Registrar'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PermisosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />} >
              <Route index element={<Login />} />
              <Route path='registrar' element={<Registrar />} />
            </Route>

            <Route path='/permisos' element={<RutaProtegida />}>
              <Route index element={<Permisos />} />
              <Route path='nuevo-permiso' element={<NuevoPermiso />} />
              <Route path='detalles-permiso/:id' element={<DetallePermiso/>}/>

              <Route path='modificar-usuario/:id' element={<ModificarUsuario/>}/>
            </Route>
          </Routes>
        </PermisosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
