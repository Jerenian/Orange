import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './style.module.scss'
import { changeMessage } from '../../features/messageSlice/messageSlice'
const SuccessBasket = () => {
    const message = useSelector(state => state.message.visible)
  return (
      <div className={message ? classes.wrapper : classes.unwrapper} >
          <p>Товар добавлен в корзину</p>
      </div>
  )
}

export default SuccessBasket