import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Layout from './Layout';
import { RiEditBoxLine } from 'react-icons/ri';

const BlogDetails = () => {
const { id } = useParams();
const [blog, setBlog] = useState({});
const navigate = useNavigate();

// setting single blog collection reference
const blogRef = doc(db, 'blogs', id);

useEffect(() => {
   // get single blog from firebase-firestore
 const getBlog = async () => {
    try{
      const blog = await getDoc(blogRef);
      setBlog({...blog.data(), id:blog.id});
    }catch(error){
      console.log(error.message);
      navigate('/');
    }
  }

  getBlog();

}, [])

document.title = blog.title;

const handleDelete = async () => {
  await deleteDoc(blogRef);
  navigate('/');
}

  return (
    <Layout>
        {<div className='mt-10 max-w-md mx-auto'>
            <h1 className='text-2xl md:text-3xl font-bold'>{blog.title}</h1>
            {blog && <small className='italic font-light'>{blog.author}</small>}
            <p className='my-5 tracking-wide leading-relaxed'>{blog.content}</p>

            {Object.keys(blog).length !== 0 && 
              <div className='flex gap-x-3 items-center justify-between'>
                <Link to ='/' className='bg-gray-600 py-3 px-4 rounded text-white hover:bg-gray-700 transition'>
                  Go back
                </Link>
                
                <Link to ={`/update/${blog.id}`} className='bg-green-600 py-3 px-4 rounded text-white hover:bg-green-700 transition flex gap-x-2 items-center'>
                  <span>Edit</span>
                  <RiEditBoxLine className='text-2xl' />
                </Link>

                <button onClick={handleDelete} className='bg-red-600 py-3 px-5 rounded text-white hover:bg-red-700 transition'>
                  Delete
                </button>
              </div>
            }
        </div>}
    </Layout>
  )
}

export default BlogDetails