import React from 'react'
import classes from './style.module.scss'
import { useSelector,useDispatch } from 'react-redux'
import { changeMenu } from '../../features/modalSlice/modalSlice'
import { useRef } from 'react'
import { NavLink } from 'react-router'
import { searchItems } from '../../features/productSlice/ProductSlice'
const Menu = () => {
    const blockRef = useRef(null)
    const modal = useSelector(state => state.modal.menu)
    //console.log(modal)
    const dispatch = useDispatch()
    const handleClick = () => {
      console.log('asdfafa')
        dispatch(searchItems(''))
        dispatch(changeMenu(null))
    }
    const childClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
  return (
    <div onClick={() => handleClick()} className={modal ? classes.wrapper : classes.unwrapper}>
      <div className={classes.container}>
            <nav className={classes.linkContainer}>
                <NavLink className={classes.link} to="/">Главная</NavLink>
                <NavLink className={classes.link} to="about">О нас</NavLink>
                <NavLink className={classes.link} to="/contact">Контакты</NavLink>
                <NavLink className={classes.link} to="/delivery">Доставка</NavLink>
            </nav>
      </div>
    </div>
  )
}

export default Menu