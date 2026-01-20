import React from 'react'
import classes from './style.module.scss'
import { useSelector,useDispatch } from 'react-redux'
import {changeProductInfo } from '../../features/modalSlice/ModalSlice'
const ProductInfoModal = () => {
    const modal = useSelector((state:any) => state.modal.productInfo.visible)
    const data = useSelector((state:any) => state.modal.productInfo.product)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(changeProductInfo(null))
        
    }
    const childClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
    
  return (
    <div onClick={() => handleClick()} className={modal ? classes.wrapper : classes.unwrapper}>
      <div onClick={(e) => childClick(e)} className={classes.container}>
                    <div className={classes.image}>
                        <img decoding="async" loading="lazy" src={`${import.meta.env.VITE_API_URL}/static/${data.img}`} alt="Картинок пока нет : (" />
                    </div>
                    <div className={classes.info}>
                        <h4 className={classes.title}>{data.name}</h4>
                        <p className={classes.description}>{data?.description}</p>
         
                    </div>
      </div>
    </div>
  )
}

export default ProductInfoModal