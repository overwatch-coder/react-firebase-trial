import React from 'react'

const UserAccount = ({user}) => {
  return (
    <div className='flex flex-col gap-y-5 items-start col-span-2'>
        <div className='flex items-center gap-x-3 text-lg'>
            <h2>
                <span className='text-cyan-800 font-medium'>Full Name:</span> {user.name}
            </h2>
        </div>

        <div className='flex items-center gap-x-3 text-lg'>
            <h2>
                <span className='text-cyan-800 font-medium'>Email Address:</span> {user.email}
            </h2>
        </div>

        <div className='flex items-center gap-x-3 text-lg'>
            <h2>
                <span className='text-cyan-800 font-medium'>User ID:</span> {user.uid} (Keep it safe)
            </h2>
        </div>
    </div>
  )
}

export default UserAccount