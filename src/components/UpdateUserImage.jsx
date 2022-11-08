import React from 'react';

const UpdateUserImage = ({profilePhoto, updatePhoto, handleFileChange}) => {
    
  return (
    <div className='md:col-span-1 mt-5: md:mt-0 text-center flex flex-col items-center gap-y-2 border p-5 shadow-md'>
        <img 
            referrerPolicy="no-referrer"
            src={profilePhoto} 
            alt="profile picture" 
            className='w-52 h-52 object-contain' 
        />

        <form className='flex flex-col items-center' onSubmit={updatePhoto}>
            <input 
                type="file" 
                className='w-full file:text-white p-3 file:bg-slate-800 file:rounded-md file:py-2 file:px-4' 
                onChange={handleFileChange}
            />

            <button 
                type='submit' 
                className='mt-3 mb-3 bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white w-full'>
                Update photo
            </button>
        </form>
    </div>
  )
}

export default UpdateUserImage