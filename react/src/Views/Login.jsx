import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setToken(data.token);
        setUser(data.user);
        navigate('/users', { replace: true });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors);
          }
          else {
            setErrors({ email: [response.data.message] });
          }
        }
      });
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login to your account</h1>
          {errors && 
            <div className='alert'>
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={emailRef} type="email" placeholder='Email'/>
          <input ref={passwordRef} type="password" placeholder='Password' />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Not registered? <a href="/signup">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  ) 
}
