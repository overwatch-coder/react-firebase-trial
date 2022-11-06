import React from 'react'

const Blog = ({blog}) => {
  let content = blog.content.length > 80 ? blog.content.slice(0, 80) : blog.content;

  return (
    <div className='py-5'>
        <h2 className='text-cyan-800 text-lg font-medium'>
            {blog.title}
        </h2>
        <small className='italic'>
            Author: {blog.author}
        </small>
        <p className='my-3 tracking-wider leading-loose'>
            {content} 
            {' '}
            {!(content.length < 80) && 
            <small className='text-blue-600 text-base'>
              See more ...
            </small>}
        </p>
    </div>
  )
}

export default Blog