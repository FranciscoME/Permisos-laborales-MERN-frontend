import {BrowserRouter, Route,Routes} from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'

function App() {

  console.log(import.meta.env);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout/>} >
          <Route index element={<Login/>} />
          <Route path='registrar' element={<Registrar/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
