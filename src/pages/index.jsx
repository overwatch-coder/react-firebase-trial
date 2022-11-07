import React, { useContext, Suspense } from 'react';
import { BlogContext } from '../context/BlogContextApi';
import Layout from './Layout';
import Blog from '../components/Blog';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextApi';

const Index = () => {
  const { blogs } = useContext(BlogContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  

  document.title = 'React Firebase Tutorial | Welcome to DevBlogs';

  const navigateToDashboard = () => {
    const name = user?.name.replace(/\s+/g, '-');
    navigate(`/dashboard/${name}`);
  }

  return (
    <Layout>
      <h1 className='text-center py-5 uppercase font-medium text-slate-800 text-2xl md:text-4xl'>
        All Blogs
      </h1>

      <Suspense fallback={<p>Fetching and Loading blogs ....</p>}>
      {blogs && 
        <ul className='max-w-5xl grid gric-cols-1 sm:grid-cols-2 gap-5 mx-auto mb-20'>
          {blogs.map(blog => (
            <Link 
              className='col-span-1 hover:text-slate-500 p-5 rounded shadow-xl' 
              to={`/blog/${blog.slug}`} 
              key={blog.id}>
              <Blog blog={blog} />
            </Link>
          ))}
        </ul>
      }
      </Suspense>

      {blogs.length !== 0 && 
        <button 
          onClick={navigateToDashboard}
          className='mx-auto flex justify-center items-center my-4 bg-blue-700 rounded text-white px-4 py-3'>
          Manage Your Blogs
        </button>}

      {blogs.length === 0 && 
        <h2 className='text-center mt-32 text-xl text-green-600'>
          Sorry! No blogs found. 
        </h2>}
    </Layout>
  )
}

export default Index
