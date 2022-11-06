import React, { useContext, useState, useEffect } from 'react'
import Layout from './Layout';
import { AuthContext } from "../context/AuthContextApi";
import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';

const Register = () => {
  document.title = 'User Account Registration | Devblogs';
  const { signInWithGmail, createAccountWithEmailandPassword, error, setError  } = useContext(AuthContext);

  useEffect(() => {
    setError('');
  }, [])

  const [inputs, setInputs] = useState({});

  const handleInputChange = (event) => {
    const username = event.target.name;
    const password = event.target.value;
    setInputs(values => ({...values, [username]: password}));
  }

  const handleRegister = (event) => {
    event.preventDefault();
    createAccountWithEmailandPassword(inputs.email, inputs.password, inputs.displayName);
    setInputs(preValues => ({...preValues, password: ''}));
  }

  return (
    <Layout>
      <div className='md:max-w-xl mx-auto mb-20'>
        <h1 className='text-center text-2xl md:text-4xl uppercase font-medium'>Register Account</h1>

        {/* Form to add new post */}
        <form onSubmit={handleRegister} className='my-10 shadow-md flex flex-col items-start gap-y-5 p-5 rounded bg-slate-50'>
          <div className='flex flex-col gap-y-2 w-full'>
            <label htmlFor="displayName" className='text-lg'>Display Name</label>
            <input 
              type="text" 
              placeholder='Enter full name...' name='displayName' 
              className='w-full py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.displayName || ''}
              required />
          </div>

          <div className='flex flex-col gap-y-2 w-full'>
            <label htmlFor="email" className='text-lg'>Email</label>
            <input 
              type="email" 
              placeholder='Enter email...' name='email' 
              className='w-full py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.email || ''}
              required />
          </div>

          <div className='flex flex-col gap-y-2 w-full'>
            <label 
              htmlFor="password" className='text-lg'>Password</label>
            <input 
              type="password" 
              placeholder='Enter passowrd...' name='password' 
              className='w-full py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.password || ''}
              required />
          </div>

          <button 
            type='submit' 
            className='rounded bg-green-600 py-3 uppercase text-white text-lg w-full hover:bg-green-700 transition'>
            Register
          </button>

          <div className='flex items-center gap-x-2'>
            <p>Already have an account: </p>
            <Link to='/login' className='text-blue-500 underline hover:text-blue-700'>Sign in</Link>
          </div>

          {error && <p className='mx-auto text-center text-red-500 my-3 tracking-wider'>{ error}</p>}
        </form>

        <div className='mx-auto flex items-center justify-center'>
          <GoogleButton onClick={signInWithGmail} />
        </div>
      </div>
    </Layout>
  )
}

export default Register