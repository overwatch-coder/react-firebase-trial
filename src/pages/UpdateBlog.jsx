import React, { useContext, useEffect, useState } from 'react'
import Layout from './Layout';
import { BlogContext } from "../context/BlogContextApi";
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc} from 'firebase/firestore';

const UpdateBlog = () => {
  document.title = 'Update Blog | Devblogs';
  const { id } = useParams();
  const blogRef = doc(db, 'blogs', id);

  const { updateBlog } = useContext(BlogContext);

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const getBlogToUpdate = async () => {
        const blog = await getDoc(blogRef);
        setInputs({...blog.data()});
    }

    getBlogToUpdate();
  }, [])

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateBlog(blogRef, inputs);
  }

  return (
    <Layout>
      <div className='md:max-w-xl mx-auto'>
        <h1 className='text-center text-2xl md:text-4xl uppercase font-medium'>Update Blog</h1>

        {/* Form to add new post */}
        <form onSubmit={handleSubmit} className='my-10 shadow-md flex flex-col items-start gap-y-5 p-5 rounded bg-slate-50'>
          <div className='flex flex-col gap-y-2 w-full'>
            <label htmlFor="title" className='text-lg'>Title</label>
            <input 
              type="text" 
              placeholder='Enter post title...' name='title' 
              className='w-full py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.title || ''}
              required />
          </div>

          <div className='flex flex-col gap-y-2 w-full'>
            <label 
              htmlFor="author" className='text-lg'>Author</label>
            <input 
              type="text" 
              placeholder='Enter author name...' name='author' 
              className='w-full py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.author || ''}
              required />
          </div>

          <div className='flex flex-col gap-y-2 w-full'>
            <label 
              htmlFor="content" className='text-lg'>Content</label>
            <textarea 
              placeholder='Write content here...' name='content' 
              className='w-full min-h-[200px] py-3 px-4 focus:border-b-2 focus:border-black outline-none border border-black rounded'
              onChange={handleInputChange}
              value={inputs.content || ''} 
              required />
          </div>

          <button 
            type='submit' 
            className='rounded bg-green-600 py-3 uppercase text-white text-lg w-full hover:bg-green-700 transition'>
            Update Post
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default UpdateBlog