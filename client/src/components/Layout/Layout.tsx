import React from 'react'
import { Outlet } from 'react-router'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import classes from './style.module.scss'
import { searchItems } from '../../features/productSlice/ProductSlice'
import { useDispatch } from 'react-redux'
const Layout = () => {
  const dispatch = useDispatch()
  return (
    <div className={classes.wrapper}>
        <Header></Header>
        <div 
        onClick={() => dispatch(searchItems(''))}
        className={classes.container}><Outlet></Outlet></div>
        <div 
        onClick={() => dispatch(searchItems(''))}
        className={classes.footer}><Footer></Footer></div>
    </div>
  )
}

export default Layout