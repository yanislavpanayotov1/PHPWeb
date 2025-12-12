import { useEffect } from 'react';
import {useStateContext} from '../contexts/ContextProvider.jsx'
import { Navigate, Outlet, Link } from 'react-router-dom'
import axiosClient from '../axios-client.js';
export default function DefaultLayout() {
    const {user , token, notification ,setUser, setToken, setNotification} = useStateContext();


    if (!token) {
        return (
            <Navigate to="/login" />
        )
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, []);
  return (
    <div id='defaultLayout'>
        <aside>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Users</Link>
        </aside>
        <div className='content'>
            <header>
                <div>
                    Header
                </div>
                <div>
                    {user.name}
                    <a href="#" className='btn-logout'
                    onClick={onLogout}
                    >Logout</a>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            {notification && 
            <div className='notification'>
                {notification}
            </div>
            }
        </div>
    </div>
  )
}
