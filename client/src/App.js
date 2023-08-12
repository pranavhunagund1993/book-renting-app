import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalContext } from './GlobalContext';

import Menu from './components/Util/Menu';
import Home from './components/Default/Home';
import Contact from './components/Default/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import Pnf from './components/Util/Pnf';
import ProtectedRoute from './AuthGaurd/ProtectedRoute';
import Header from './components/Util/Header';
import Footer from './components/Util/Footer';
import Books from './components/Admin/screens/Books';
import Category from './components/Admin/screens/Category';
import Rent from './components/Admin/screens/Rent';
import Customer from './components/Admin/screens/Customer';

function App() {
  const context = useContext(GlobalContext)
  const [isLogged] = context.auth.isLogged
  const [isUser] = context.auth.isUser
  const [isAdmin] = context.auth.isAdmin

  return (
    <BrowserRouter>
      <Header/>
      <Menu/>
      <ToastContainer  position={'top-center'} autoClose={4000} />
      <Routes>
          <Route path={'/'} element={ <Home/> } />
          <Route path={'/contact'} element={ <Contact/> } />
          <Route path={'/login'} element={ <Login/> } />
          <Route path={'/register'} element={ <Register/> } />
            {
              isLogged && isUser ? (
                <Route element={ <ProtectedRoute/> }>
                  <Route path={'/user/dashboard'} element={ <UserDashboard/> } />
                </Route>
              ): null
            }
            {
              isLogged && isAdmin ? (
                <Route element={ <ProtectedRoute/> }>
                  <Route path={'/admin/dashboard'} element={ <AdminDashboard/> } />
                  <Route path={'/admin/books/list'} element={ <Books/> } />
                  <Route path={'/admin/category/list'} element={ <Category/> } />
                  <Route path={'/admin/rented/list'} element={ <Rent/> } />
                  <Route path={'/admin/customers/list'} element={ <Customer/> } />
                </Route>
              ): null
            }
          <Route path={'/*'} element={ <Pnf/> } />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App