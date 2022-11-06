import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthContextApi from './context/AuthContextApi';
import BlogContextApi from './context/BlogContextApi';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextApi>
      <BlogContextApi>
        <App />
      </BlogContextApi>
    </AuthContextApi>
  </React.StrictMode>
)
