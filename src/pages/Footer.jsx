import React from 'react';

const Footer = () => {
  return (
    <div className='py-5 bg-gray-800 w-screen text-center z-20'>
      <p className='text-base text-white'>
        Copyright &copy; {new Date().getFullYear()} DevBlogs Inc.
      </p>
    </div>
  )
}

export default Footer
