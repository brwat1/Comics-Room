import React from 'react'
import { Routes, Route } from 'react-router-dom'
// import Comics from '../components/Comics'
// import Comic from '../components/Comic'

const ComicsPage = () => {
  return (
    <Routes>
      <Route path='/' element={<div />} />
      <Route path=':id' element={<div />} />
    </Routes>
  )
}

export default ComicsPage
