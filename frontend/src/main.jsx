import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Main from './clientComponents/Main.jsx'
import Feachered from './clientComponents/Feachered.jsx'
import Propertiex from './clientComponents/Propertiex.jsx'
import Pricing from './clientComponents/Pricing.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminTable from './adminPannel/AdminTable.jsx'
import ViewProduct from './adminPannel/ViewProduct.jsx'
import UpdateProduct from './adminPannel/UpdateProduct.jsx'
import AddProduct from './adminPannel/AddProduct.jsx'

let router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App/>}>
      <Route path='' element={<Main/>}/>
      <Route path='/about' element={<Feachered/>}/>
      <Route path='/properties' element={<Propertiex/>}/>
      <Route path='/pricing' element={<Pricing/>}/>

    </Route>

    <Route path='/admin' element={<AdminLayout/>}>
      <Route path='' element={<AdminTable/>} />
      <Route path='/admin/view/:id' element={<ViewProduct/>} />
      <Route path='/admin/update/:id' element={<UpdateProduct/>} />
      <Route path='/admin/addProduct' element={<AddProduct/>} />
    </Route>

    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
