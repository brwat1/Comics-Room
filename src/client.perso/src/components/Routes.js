import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import HomePage from '../pages/HomePage'
import ComicPage from '../pages/ComicPage'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Account from '../pages/Account'

const Routes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='comic/*' element={<ComicPage />} />
                <Route path='search' element={<Search />} />
                <Route path='login' element={<Login />} />
                <Route path='account' element={<Account />} />
                {/*<Route path='about' element={<h1>A propos</h1>} />*/}
                {/*<Route path='contact' element={<h1>Contact</h1>} />*/}
                <Route path='*' element={<h1>Not Found 404</h1>} />
            </Routes>
        </>
    )
}

export default Routes
