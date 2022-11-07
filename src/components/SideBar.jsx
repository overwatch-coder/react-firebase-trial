import React from 'react';
import { MdOutlineClose, MdOutlineMenu } from 'react-icons/md';

const SideBar = (
    {
        signOutUser, 
        accountDivRef, 
        blogDivRef,
        openSideBar,
        setOpenSideBar,
        setDataToManage
    }) => {

    const displayAccount = () => {
        accountDivRef.current.classList.remove('hidden');
        blogDivRef.current.classList.add('hidden');
        setDataToManage('Account');
        setOpenSideBar(value => !value);
    }

    const dislayBlogs = () => {
        blogDivRef.current.classList.remove('hidden');
        accountDivRef.current.classList.add('hidden');
        setDataToManage('Blogs');
        setOpenSideBar(value => !value);
    }

    const displaySideBar = () => {
        setOpenSideBar(value => !value);
    }

  return (
    <section>
        {/* Hamburger Menu*/ }
        <div 
            onClick={displaySideBar} 
            className={`${!openSideBar ? 'left-[90%] top-16 md:top-14 md:left-[200px] transition-all duration-700' : 'left-0 transition-all duration-700'} top-14 fixed cursor-pointer flex flex-col items-end z-30 bg-slate-700`}
        >

            {openSideBar ? 
            <MdOutlineMenu className='text-3xl text-white' /> 
            :
            <MdOutlineClose className='text-3xl text-white' />
            }
        </div>

        {/* Dashboard Side Bar*/}
        <div 
            className={`${!openSideBar ? 'left-0 transition-all duration-700' : 'left-[-99.9%] md:left-[-90%] transition-all duration-700'} top-12 fixed flex flex-col items-start gap-y-5 px-3 py-4 text-white min-h-screen bg-slate-700 w-full md:w-[200px]`}
        >
            <h2 className='text-center self-center uppercase underline py-2'>
                Manage Account
            </h2>

            <button 
                onClick={displayAccount} 
                className='uppercase hover:bg-cyan-600 py-2 px-3 w-full text-left transition-all duration-700'
            >
                Account
            </button>

            <button 
                onClick={dislayBlogs} 
                className='uppercase hover:bg-cyan-600 py-2 px-3 w-full text-left transition-all duration-700'
                >
                Blogs
            </button>

            <button 
                onClick={signOutUser} 
                className='uppercase hover:bg-cyan-600 py-2 px-3 w-full text-left transition-all duration-700'
                >
                Logout
            </button>
        </div>
    </section>
  )
}

export default SideBar