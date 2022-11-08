import React from 'react';
import { Link } from 'react-router-dom';
import Blog from './Blog';

const DashboardBlogs = ({blogDivRef, userBlogs}) => {
  return (
    <div className='hidden ' ref={blogDivRef}>
        {userBlogs && 
            <ul className='max-w-5xl grid gric-cols-1 sm:grid-cols-2 gap-5 mx-auto mb-20'>
            {userBlogs.map(blog => (
                <Link 
                    className='col-span-1 hover:text-slate-500 p-5 rounded shadow-xl' 
                    to={`/blog/${blog.slug}`} 
                    key={blog.id}
                >
                    <Blog blog={blog} />
                </Link>
            ))}
            </ul>
        }

        {userBlogs.length === 0 && 
            <h2 className='text-center mt-32 text-xl text-green-600'>
            Sorry! No blogs found. 
            </h2>
        }
    </div>
  )
}

export default DashboardBlogs