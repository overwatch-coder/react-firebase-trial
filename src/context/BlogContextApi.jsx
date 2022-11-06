import { 
  createContext, 
  useState, 
  useEffect
} from "react";

import { db } from '../firebase';

import { 
  getDocs, 
  collection,
  addDoc, 
  serverTimestamp,
  orderBy,
  query,
  updateDoc,
  doc,
  getDoc
} from 'firebase/firestore';

export const BlogContext = createContext();

 const BlogContextApi = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);

  // setting all blogs collection reference
  const blogsRef = collection(db, 'blogs');

  // query and sort blogs according to date and time created
  const queryData = query(blogsRef, orderBy('createdAt', 'desc'))

  // get all blogs from firebase-firestore
  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(queryData);

      setBlogs(data.docs.map(blog => ({...blog.data(), id:blog.id})));

    }
    getBlogs();
  }, [blogs]);

  // add blog to firebase-firestore
  const addBlog = async (blog) => {
    try{
      await addDoc(blogsRef, {...blog, createdAt: serverTimestamp()}); 
      window.location.pathname='/';
    }catch(error) {
      console.log(error.message);
    }
  }

  // update blog found in firebase-firestore
  const updateBlog = async (blogRef, blog) => {
    try {
      await updateDoc(blogRef, blog);
      window.location.pathname='/';
    } catch (error) {
      console.log(error.message);
    }
  }

  // get blogs created by current user
  const getCurrentUserBlogs = async (id) =>{
    const blogsRef = doc(db, 'blogs', id);
    try {
      const data = await getDoc(blogsRef);
      setUserBlogs(data.docs.map(blog => ({...blog.data(), id: blog.id})));
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <BlogContext.Provider 
      value={{ 
        blogs, 
        addBlog,
        updateBlog,
        getCurrentUserBlogs,
        userBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContextApi;
