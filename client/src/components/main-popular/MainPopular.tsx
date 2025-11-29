import React, { useState } from 'react'
import classes from './style.module.scss'
import type { IProductProps } from '../../types'
import classicLove from '../../assets/images/pages/main/classicLove.png'
import { useDispatch } from 'react-redux'
import { changePaymentModal, changeProductInfo } from '../../features/modalSlice/modalSlice'
import { useNavigate } from 'react-router'
import { useAddBasketMutation } from '../../services/basket'
import { changeMessage } from '../../features/messageSlice/messageSlice'
import { getBasket } from '../../features/basketSlice/basketSlice'
import { useGetAllTypesQuery } from '../../services/type'
const MainPopular = ({data}: IProductProps) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [palette, setPalette] = useState('')
    const [message, setMessage] = useState({chooseColor: '' })
    const [setBasket] = useAddBasketMutation()
    const dataTypes = useGetAllTypesQuery(null)
    const typeName = dataTypes?.data?.find(item => item.id === data.typeId)?.name
    const handleClick = () => {
        dispatch(changePaymentModal())
    }
        const addBasket = async (item, e) => {      
                e.stopPropagation()
                if(item.palette.length) {
                    if(palette === '') {
                        console.log('a')
                        setMessage({...message, chooseColor: 'Выберите цвет'})
                        throw new Error()
                    } else {
                        setMessage({...message, chooseColor: ''})
                        const data = {
                            id: item.id,
                            palette: palette
                        }
                        const basket = await setBasket(data)
                        const res = basket
                        if(res?.error?.status === 403 || res?.error?.status === 401) {
                            navigate('/login') 
                        }
                        if(res?.data) {
                            dispatch(changeMessage(null))
                            setTimeout(() => {
                                dispatch(changeMessage(false))
                            }, 3000);
                            dispatch(getBasket(res.data))
    
                        }
                    }
                } else {
                
                const basket = await setBasket({id: item.id})
                const data = basket
                if(data?.error?.status === 403 || data?.error?.status === 401) {
                    navigate('/login')
                }
                if(data?.data) {
                    dispatch(changeMessage(null))
                    dispatch(getBasket(data.data))
                    setTimeout(() => {
                        dispatch(changeMessage(false))
                    }, 3000);
                }
            }
        }
  return (
    <div 
    onClick={() => dispatch(changeProductInfo(data))}
    className={classes.wrapper} >
        <img src={`${import.meta.env.VITE_API_URL}/${data.img}`} alt="" />
        <div className={classes.text}>
            <h4 className={classes.title}>{data.name}</h4>
                            <div className={classes.palette}>
                    {
                        message.chooseColor !== '' ? (
                            <p>{message.chooseColor}</p>
                        ) : null
                    }
                    {
                        data?.palette?.toString() !== "" ? data.palette.toString().split(',').map(item => (
                            <div 
                            className={classes.paletteContainer}>
                            {
                                typeName?.toUpperCase() != 'ОТКРЫТКИ' ? (
                                <button 
                                onClick={(e) => {e.stopPropagation(), setPalette(e.target.value) }}
                                value={item}
                                className={palette === item ? classes.paletteItem : classes.paletteChosen}
                                style={{
                                    background: item
                                }}
                                />
                            ) : (

                            <p 
                                onClick={(e) => {e.stopPropagation(), setPalette(item) }}
                                className={palette === item ? classes.numberChosen : classes.numberItem}
                            >
                                {item}
                            </p>
                            )
                            }
                            </div>
                        )) : (
                            <div className={classes.noPalettes}>
                            </div>
                        )
                    }
                </div>
        <div className={classes.priceContainer}>
            <span>{data.price} ₽ / шт</span> 
            <button onClick={ (e) => addBasket(data, e)} className={classes.card}>Добавить в корзину</button>
        </div> 
        </div>
    </div>
  )
}

export default MainPopular