import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import AddProducts from './pages/AddProducts.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EditProducts from './pages/EditProducts.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path : "/dashboard",
        element : <Dashboard/>
      },
      
    ]
  },
  {
    path : "/products",
    element : <AddProducts/>
  },
  {
    path: "/edit-product/:slug",
    element: <EditProducts />
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}> <App /></RouterProvider>
    
  </React.StrictMode>,
)
