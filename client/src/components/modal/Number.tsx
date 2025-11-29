import React from 'react'
import classes from './style.module.scss'
import { useSelector,useDispatch } from 'react-redux'
import { changeNumber } from '../../features/modalSlice/modalSlice'
import { useRef } from 'react'
const NumberModal = () => {
    const blockRef = useRef(null)
    const modal = useSelector(state => state.modal.number)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(changeNumber())
    }
    const childClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
  //(modal)
  return (
    <div onClick={() => handleClick()} className={modal ? classes.wrapper : classes.unwrapper}>
      <div onClick={(e) => childClick(e)} className={classes.container}>
        <h2>Позвоните нам по номеру: +7 (495) 123-45-67</h2>
      </div>
    </div>
  )
}

export default NumberModal