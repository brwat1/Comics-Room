import React from 'react'
import Layout from './components/Layout'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import ComicsPage from './pages/ComicsPage'
import Register from './pages/Register'
import Account from './pages/Account'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='comics' element={<ComicsPage />} />
        <Route path='register' element={<Register />} />
        <Route path='account' element={<Account />} />
        <Route path='about' element={<h1>A propos</h1>} />
        <Route path='contact' element={<h1>Contact</h1>} />
        <Route path='*' element={<h1 style={{ color: '#ff9e00' }}>Not Found 404</h1>} />
      </Routes>
    </Layout>
  )
}

export default App
