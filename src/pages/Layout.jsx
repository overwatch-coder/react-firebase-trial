import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
  return (
    <main className='flex flex-col min-h-screen overflow-x-hidden'>
      <Navbar />

      <section className='mb-auto pt-20 px-4'>
        {children}
      </section>

      <Footer />
    </main>
  )
}

export default Layout
