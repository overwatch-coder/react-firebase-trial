import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Index from "./pages";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogDetails from "./pages/BlogDetails";
import UpdateBlog from "./pages/UpdateBlog";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContextApi";
import { useContext } from "react";
import Dashboard from "./pages/Dashboard";

const App = () =>{
  const { isAuth } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index /> } />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/create" element={isAuth ? <CreateBlog /> : <Navigate to ='/login' />} />
        <Route path="/login" element={!isAuth ? <Login /> : <Navigate to ='/' /> } />
        <Route path="/register" element={!isAuth ? <Register /> : <Navigate to ='/' /> } />
        <Route path="/update/:id" element={isAuth ? <UpdateBlog /> : <Navigate to ='/login' /> } />
        <Route path="/dashboard/:userName" element={isAuth ? <Dashboard /> : <Navigate to ='/login' /> } />
        <Route path="*" element = {<NotFound /> } />
      </Routes>
    </Router>
  )
}

export default App
