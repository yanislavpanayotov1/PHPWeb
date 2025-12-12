import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider';

export default function UserForm() {
    const { id } = useParams();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    
    if (id) {
      useEffect(() => {
        setLoading(true);
        axiosClient.get(`/users/${id}`)
          .then(({data}) => {
            setLoading(false);
            setUser(data);
          })
          .catch(() => {
            setLoading(false);
          });
      }, [id]);
    } 

    const onSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
        axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
            setNotification('User updated successfully');
            navigate('/users');
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    } else {
        axiosClient.post('/users', user)
        .then(() => {
            setNotification('User created successfully');
            navigate('/users');
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    }}
  return (
    <>
        {user.id && <h1>Update User: {user.name}</h1>}
        {!user.id && <h1>Create New User</h1>}
        <div className='card animated fadeInDown'>
            
        {loading && <div className='text-center'>Loading...</div>}
        {errors && 
            <div className='alert'>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
        {!loading && <form onSubmit={onSubmit}>
            <input type="text" placeholder='Name' value={user.name} onChange={e => setUser({...user, name: e.target.value})} />
            <input type="email" placeholder='Email' value={user.email} onChange={e => setUser({...user, email: e.target.value})} />
            <input type="password" placeholder='Password'  onChange={e => setUser({...user, password: e.target.value})} />
            <input type="password" placeholder='Password Confirmation'  onChange={e => setUser({...user, password_confirmation: e.target.value})} />
            <button className='btn btn-block'>Save</button>
        </form>}
        </div>
    </>
)
}
