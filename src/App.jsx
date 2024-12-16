//Appjsx
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormProvider from './context/FormProvider'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
     <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='*' element={<NotFoundPage/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>
     </FormProvider>
    </>
  )
}

export default App
