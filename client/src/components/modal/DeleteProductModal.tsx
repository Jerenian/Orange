import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {changeDeleteProduct } from '../../features/ModalSlice/ModalSlice'
import classes from './style.module.scss'
import {useRemoveProductMutation } from '../../services/remove'
const DeleteProductModal = () => {

    const modal = useSelector((state: any) => state.modal.deleteProduct)
    const dispatch = useDispatch()
    const [remove, {data, isLoading}] = useRemoveProductMutation()
    const handleClick = () => {
        dispatch(changeDeleteProduct(null))
    }
    const childClick = (e: React.MouseEvent) => {
      e.stopPropagation()
    }
    const handleRemove = async () => {
        await remove(modal.typeId)
    setTimeout(() => {
        window.location.reload()
      }, 1500);
    }

  return (
    <div onClick={() => handleClick()} className={modal.visible ? classes.wrapper : classes.unwrapper}>
        <div onClick={(e) => childClick(e)} className={classes.container}>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>Вы уверены, что хотите удалить этот товар?</h2>
            </div>
            <div className={classes.buttons}>
                            <button disabled={data ? true : false} onClick={() => handleRemove()} className={data ? classes.saved : classes.save}>
                {isLoading ? (
                  <span>загрузка</span>
                ) : data ? (
                <div>Сохранено!</div>
                ): (
                <span style={{color: 'red'}} >Удалить</span>
                )}
            </button>
                <button onClick={() => handleClick()} className={classes.alter}>Отменть</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteProductModal