import { useRef } from 'react';
import { useState } from 'react';
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextApi';
import { BlogContext } from '../context/BlogContextApi';
import Layout from './Layout';
import SideBar from '../components/SideBar';
import DashboardContent from '../components/DashboardContent';

const Dashboard = () => {
    const { userName } = useParams();
    const { userBlogs, getCurrentUserBlogs } = useContext(BlogContext);
    const { user, signOutUser } = useContext(AuthContext);

    const blogDivRef = useRef();
    const accountDivRef = useRef();

    const [dataToManage, setDataToManage] = useState('Account');
    const [openSideBar, setOpenSideBar] = useState(false);

    useEffect(() => {
        getCurrentUserBlogs(user.uid);
    }, [])

  return (
    <Layout>

        {/* Dashboard Side Bar*/}
        <SideBar 
            signOutUser={signOutUser}
            accountDivRef={accountDivRef} 
            blogDivRef={blogDivRef}
            openSideBar={openSideBar}
            setOpenSideBar={setOpenSideBar} 
            setDataToManage={setDataToManage}
        />

        {/* Dashboard Main Content*/}
        <DashboardContent 
            userBlogs={userBlogs} 
            user={user} 
            userName={userName} 
            blogDivRef={blogDivRef} 
            openSideBar={openSideBar}
            dataToManage={dataToManage}
            accountDivRef={accountDivRef}
        />
    </Layout>
  )
}

export default Dashboard