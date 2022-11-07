import {useState}from 'react';
import profilePicture from '../assets/person.jpg';
import DashboardBlogs from './DashboardBlogs';
import UpdateUserImage from './UpdateUserImage';
import UserAccount from './UserAccount';

const DashboardContent = (
    {   user, 
        userName, 
        userBlogs, 
        blogDivRef,
        dataToManage,
        openSideBar,
        accountDivRef
    }) => {

    const [file, setFile] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(user?.photoURL ? user.photoURL : profilePicture);
    
    const handleFileChange = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]));
    }

    const updatePhoto = (event) => {
        event.preventDefault();
        console.log(file);
        setFile('');
        // setProfilePhoto(file);
        const input = document.querySelector('input');
        input.value = '';
    }

  return (
    <div className={`${!openSideBar ? 'ml-[200px] transition-all duration-700' : 'ml-[0] transition-all duration-700'} pb-20`}>
        <h1 className='text-center py-5 uppercase font-medium text-cyan-800 text-xl md:text-3xl'>
            Manage Your {dataToManage}- {userName.split('-')[0]}
        </h1>

        <DashboardBlogs 
            blogDivRef={blogDivRef}
            userBlogs={userBlogs} 
        />

        {/* Account Details Go Here */}
        <div 
            className='mt-7 grid grid-cols-1 md:grid-cols-3 gap-y-5 md:gap-y-0 md:gap-x-5' 
            ref={accountDivRef}
        >
            <UserAccount user={user} />

            {/* Profile Picture Goes Here */}
            <UpdateUserImage 
                profilePhoto={profilePhoto} 
                updatePhoto={updatePhoto}
                handleFileChange={handleFileChange}
                file={file}
            />
        </div>
    </div>
  )
}

export default DashboardContent