import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from './../../GlobalContext';
import axios from 'axios'
import { toast } from 'react-toastify';

function Menu(props) {
    const context = useContext(GlobalContext)
    const [isLogged] = context.auth.isLogged
    const [isUser] = context.auth.isUser
    const [isAdmin] = context.auth.isAdmin

    const navigate = useNavigate()

    const logoutHandler = async () => {
        if(window.confirm('Are you sure to logout?')) {
            await axios.get('/api/auth/logout')
            .then(res => {
                toast.success(res.data.msg)
                navigate('/')
                localStorage.removeItem('loginStatus')
                window.location.href = '/';
            }).catch(err => toast.error(err.msg))
        } else {
            return;
        }
    }

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-success'>
        <div className="container">
            <NavLink to={'/'} className='navbar-brand'>Book Rent</NavLink>

            <button className="navbar-toggler" data-bs-toggle='collapse' data-bs-target='#menu'>
                <span className="navbar-toggler-icon"></span>
            </button>

            {
                isLogged ? (
                    <div className="collapse navbar-collapse justify-content-end" id='menu'>
                        <ul className="navbar-nav me-5">
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    Account
                                </NavLink>
                                <ul className="dropdown-menu text-center">
                                    <li>
                                        {
                                            isUser ? (
                                            <React.Fragment>
                                                <li>
                                                    <NavLink to={'/user/dashboard'} className="dropdown-item">Dashboard</NavLink>
                                                </li>
                                            </React.Fragment> 
                                            ) : null
                                        }
                                        {
                                            isAdmin ? (
                                                <React.Fragment>
                                                    <li>
                                                        <NavLink to={'/admin/dashboard'} className="dropdown-item">Dashboard</NavLink> 
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/admin/books/list'} className="dropdown-item">Books</NavLink> 
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/admin/category/list'} className="dropdown-item">Category</NavLink> 
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/admin/rented/list'} className="dropdown-item">Rent</NavLink> 
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/admin/customers/list'} className="dropdown-item">Customer</NavLink> 
                                                    </li>
                                                </React.Fragment>
                                            ) : null
                                        }
                                    </li>
                                    <li>
                                        <NavLink to={'/'} onClick={logoutHandler} className="dropdown-item btn btn-danger">Logout</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="collapse navbar-collapse justify-content-between" id='menu'>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/'} className='nav-link'>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/contact'} className='nav-link'>Contact</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/login'} className='nav-link'>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/register'} className='nav-link'>Register</NavLink>
                            </li>
                        </ul>
                    </div>
                )
            }
        </div>
    </nav>
  )
}

export default Menu