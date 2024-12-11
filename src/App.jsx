import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './pages/Layout'

function App() {

  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route element={<Layout/>}>
           <Route path='/' element={<HomePage/>}/>
           <Route path='*' element={<NotFoundPage/>}/> 
         </Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
