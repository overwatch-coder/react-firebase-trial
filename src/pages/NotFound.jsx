import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../assets/notfound.png';

const NotFound = () => {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 1500);
    }, [])
  return (
    <div className='w-full h-screen relative bg-gradient-to-r from-pink-300 to-violet-500'>
        <img 
            src={notFound} 
            alt="not found"
            className='md:w-full md:h-full object-cover'
        />
    </div>
  )
}

export default NotFound