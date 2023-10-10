import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'


const { Header, Content, Footer } = Layout

const contentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '3rem 3rem',
  justifyContent: 'center'
}

const HCLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>
              <Link to='/'><img src={'home2.png'} alt={'home icon'}></img></Link>
          </Menu.Item>
          <Menu.Item key='2'>
              <Link to='/login'><img src={'user2.png'} alt={'user icon'} style={{ maxHeight: '75%' }}></img></Link>
          </Menu.Item>
          <Menu.Item key='3'>
              <Link to='/comics'><img src={'book2.png'} alt={'book icon'} style={{ maxHeight: '70%' }}></img></Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={contentStyle} children={ children } />

      <Footer style={{ textAlign: 'center' }}>
        footer
      </Footer>
    </Layout>
  )
}

export default HCLayout
