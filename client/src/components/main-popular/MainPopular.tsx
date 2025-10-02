import React from 'react'
import classes from './style.module.scss'
import type { IProductProps } from '../../types'
import classicLove from '../../assets/images/pages/main/classicLove.png'
import { useDispatch } from 'react-redux'
import { changeModal } from '../../features/modalSlice/modalSlice'
const MainPopular = ({data}: IProductProps) => {

    const dispatch = useDispatch()
    
    const handleClick = () => {
        dispatch(changeModal())
        
}
  return (
    <div className={classes.wrapper} >
        <img src={data.img ?? classicLove} alt="" />
        <div className={classes.text}>
            <h4 className={classes.title}>{data.name}</h4>
            <p className={classes.subTitle}>{data.description}</p>
        <div className={classes.priceContainer}>
            <span>{data.price} ₽ / шт</span> 
            <button onClick={ () => handleClick()} className={classes.card}>Оформить заказ</button>
        </div> 
        </div>
    </div>
  )
}

export default MainPopular