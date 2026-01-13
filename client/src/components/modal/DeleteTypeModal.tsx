import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeDeleteType } from '../../features/modalSlice/ModalSlice'
import classes from './style.module.scss'
import { useRemoveTypeMutation } from '../../services/remove'
const DeleteTypeModal = () => {

    const modal = useSelector((state:any) => state.modal.deleteType)
    const dispatch = useDispatch()
    const [remove, {data, isLoading}] = useRemoveTypeMutation()
    const handleClick = () => {
        dispatch(changeDeleteType(null))
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
                <h2 className={classes.title}>Вы уверены, что хотите удалить категорию товаров?</h2>
                <p className={classes.subTitle}>При удалении категории удаляться и все товары, находящиеся в этой категории</p>
            </div>
            <div className={classes.buttons}>
                            <button disabled={data ? true : false} onClick={() => handleRemove()} className={data ? classes.saved : classes.save}>
                {isLoading ? (
                  <span>загрузка</span>
                ) : data ? (
                <div>Сохранено!</div>
                ): (
                <span>Удалить</span>
                )}
            </button>
                <button onClick={() => handleClick()} className={classes.alter}>Отменть</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteTypeModal