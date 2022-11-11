import React from 'react'

const Pagination = ({totalBlogs, postsPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for(let i = 1; i <= Math.ceil((totalBlogs/postsPerPage)); i++){
        pages.push(i);
    }

  return (
    <div className='mx-auto text-center'>
        {pages.map((page, index) => (
            <button 
                key={index} 
                onClick={() => setCurrentPage(page)} 
                className={`px-5 py-3 rounded text-white text-center mx-3 ${page === currentPage ? 'bg-green-600' : 'bg-slate-800'}`}
            >
                {page}
            </button>
        ))}
    </div>
  )
}

export default Pagination