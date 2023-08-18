import React from 'react'
import Layout from './components/Layout'
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './components/Routes'

const App = () => {
  return (
    <Layout>
        <Header />
        <Routes/>
        <Footer />
    </Layout>
  )
}

export default App
