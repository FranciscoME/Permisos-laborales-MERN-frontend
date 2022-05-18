import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'
import Login from './pages/Login'
import NuevoPermiso from './pages/NuevoPermiso'
import Permisos from './pages/Permisos'
import Registrar from './pages/Registrar'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />} >
            <Route index element={<Login />} />
            <Route path='registrar' element={<Registrar />} />
          </Route>

          <Route path='/permisos' element={<RutaProtegida />}>
            <Route index element={<Permisos />} />
            <Route path='nuevo-permiso'  element={<NuevoPermiso/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
