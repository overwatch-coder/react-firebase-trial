import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { AuthContext } from '../context/AuthContextApi';
import personImg from '../assets/person.jpg';

const Navbar = () => {
  const { isAuth, signOutUser, user } = useContext(AuthContext);
  const { name } = user;
  const firstName = name?.split(' ')[0];

  const profilePicture = user?.photoURL ? user.photoURL : personImg;

  const [openMenu, setOpenMenu] = useState(false);

  const handleToggleMenu = () => {
    setOpenMenu(prev => !prev);
  }

  return (
    <nav className='w-screen py-3 bg-slate-900 fixed shadow-md z-50'>
      <div className={`px-5 flex flex-col md:flex-row md:justify-between md:items-center`}>

        {/* Logo */ }
        <div className='flex justify-between'>
          <Link to='/' className='text-xl md:text-2xl text-white uppercase'>
            DevBlogs
          </Link>

          {isAuth && <div className='md:hidden group flex items-center gap-x-5 mx-4 cursor-pointer text-white'>
            <img 
              referrerPolicy="no-referrer" 
              src={user && profilePicture} 
              alt="profile picture" 
              className='w-8 h-8 rounded-full' />
            <span>{user && firstName}</span>

            {/* Diplay Hidden Information */}
            <div className='hidden group-hover:flex absolute top-[43px] -right-0 bg-slate-900 px-3 py-4 shadow-md w-full flex-col gap-y-2 transition-all duration-1000'>
              <p>Email: {user && user.email}</p>
              <p>Full name: {user && user.name}</p>
            </div>
          </div>}

          {/* Hamburger Menu*/ }
          <p onClick={handleToggleMenu} className='md:hidden cursor-pointer'>
            {!openMenu ? 
              <MdOutlineMenu className='text-3xl text-white' /> 
              :
              <MdOutlineClose className='text-3xl text-white' />
            }
          </p>
        </div>

        {/* Desktop Navlinks */ }
        <ul className='hidden md:flex flex-row items-center gap-x-6 mt-0 pr-5'>
            <Link 
              className='text-white uppercase hover:text-cyan-500' 
              to='/'
              >
                Home
            </Link>

           {isAuth && <Link 
              className='text-white uppercase hover:text-cyan-500' 
              to='/create'
              >
                Create Blog
            </Link>}

            {!isAuth && 
              <>
                <Link 
                className='text-white uppercase hover:text-cyan-500' 
                to='/login'
                >
                  Login
                </Link>

                <Link 
                  className='text-white uppercase hover:text-cyan-500' 
                  to='/register'
                  >
                    Register
                </Link>
                </>
          }
        </ul>

        {/* User details and logout button */ }
        {isAuth && <div className='hidden md:flex text-white items-center relative'>
          <div className='group flex items-center gap-x-5 mx-4 cursor-pointer'>
            <img referrerPolicy="no-referrer" src={user && profilePicture} alt="profile picture" className='w-8 h-8 rounded-full' />
            <span>{user && firstName}</span>

            {/* Diplay Hidden Information */}
            <div className='hidden group-hover:flex absolute top-[43px] -right-0 bg-slate-900 px-3 py-4 shadow-md w-[350px] flex-col gap-y-2 transition-all duration-1000'>
              <p>Email: {user && user.email}</p>
              <p>Full name: {user && user.name}</p>
            </div>
          </div>

          {/* Logout button */}
          <button 
            onClick={signOutUser} 
            className='text-white uppercase hover:text-cyan-500'>
            Logout
          </button>
        </div>}

        {/* Mobile Navlinks */ }
        {openMenu &&
          <ul className='flex flex-col gap-y-1 mt-2 md:hidden'>
            <Link 
              className='px-3 text-white uppercase hover:bg-cyan-900 py-3 rounded' 
              to='/'
              >
                Home
            </Link>

           {isAuth && 
            <Link 
              className='px-3 text-white uppercase hover:bg-cyan-900 py-3 rounded' 
              to='/create'
              >
                Create Blog
            </Link>}

            {!isAuth && 
              <>
                <Link 
                className='px-3 text-white uppercase hover:bg-cyan-900 py-3 rounded' 
                to='/login'
                >
                  Login
                </Link>

                <Link 
                  className='px-3 text-white uppercase hover:bg-cyan-900 py-3 rounded' 
                  to='/register'
                  >
                    Register
                </Link>
              </>
            }

            {/* Logout button */}
            {isAuth && <button 
              onClick={signOutUser} 
              className='px-3 text-white uppercase hover:bg-cyan-900 py-3 rounded'>
              Logout
            </button>}
          </ul>
        }
      </div>
    </nav>
  )
}

export default Navbar
