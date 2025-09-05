import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'
import Header from '../header/Header'
const Layout = () => {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Layout