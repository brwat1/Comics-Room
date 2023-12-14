import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd'

const { Header, Content, Footer } = Layout
const contentStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  padding: '3rem 3rem',
  justifyContent: 'center'
}

const HCLayout = ({ children }) => {
    const { pathname } = useLocation();
    const [selectedKey, setSelectedKey] = useState('1');

    useEffect(() => {
        const routeKeyMapping = {
            '/': '1',
            '/account': '2',
            '/comics': '3',
        };
        setSelectedKey(routeKeyMapping[pathname] || '1');
    }, [pathname]);

  return (
    <Layout>
      <Header>
          <Menu theme='dark' mode='horizontal' selectedKeys={[selectedKey]}>
          <Menu.Item key='1'>
              <Link to='/'><img src={'home2.png'} alt={'home icon'}></img></Link>
          </Menu.Item>
          <Menu.Item key='2'>
              <Link to='/account'><img src={'user2.png'} alt={'user icon'} style={{ maxHeight: '75%' }}></img></Link>
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
