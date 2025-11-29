import React, { useState } from 'react'
import classes from './style.module.scss'
import type { IProductProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { changePaymentModal } from '../../features/modalSlice/modalSlice'
import flower from '../../assets/images/pages/main/flowers.png'
import { useAddFavoriteMutation } from '../../services/favorite'
import Modal from '../modal/Modal'
import { useNavigate } from 'react-router'
import { getFavorite } from '../../features/favoriteSlice/favoriteSlice'
import { changeProductInfo } from '../../features/modalSlice/modalSlice'
import { useAddBasketMutation } from '../../services/basket'
import { getBasket } from '../../features/basketSlice/basketSlice'
import { useGetAllTypesQuery } from '../../services/type'
import { changeMessage } from '../../features/messageSlice/messageSlice'
const Product = ({data, column}: IProductProps) => {
    const [setFavorite] = useAddFavoriteMutation()
    const [setBasket] = useAddBasketMutation()
    const dataFavorites = useSelector(state => state.favorite.data)
    const dataBaskets = useSelector(state => state.basket.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dataTypes = useGetAllTypesQuery(null)
    const [message, setMessage] = useState({chooseColor: '' })
    const [palette, setPalette] = useState('')
    const typeName = dataTypes?.data?.find(item => item.id === data.typeId)?.name
    const like = dataFavorites?.find(item => item.productId == data.id)
    const basketItem = dataBaskets?.find(item => item.productId == data.id)
    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        dispatch(changePaymentModal())
    }
    const addFavorite = async (id: string, e) => {
        e.stopPropagation()
            const favorite = await setFavorite(id)
            const data = favorite
            if(data?.error?.status){
                navigate('/login')
            }
            if(!data?.error) {
                dispatch(getFavorite(data.data))
        }
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
    <div onClick={() => dispatch(changeProductInfo(data))} className={classes.wrapper}>
        

        <div style={column ? {display: 'flex'} : {display:'block'}}  className={classes.container}>
            {
                like?.productId === data.id ?
                (
                    <div onClick={(e) => addFavorite(data.id, e)} className={classes.favorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                        <path d="M1.30156 7.46406L6.24258 12.0769C6.44766 12.2684 6.71836 12.375 7 12.375C7.28164 12.375 7.55234 12.2684 7.75742 12.0769L12.6984 7.46406C13.5297 6.69023 14 5.60468 14 4.46992V4.31132C14 2.39999 12.6191 0.770306 10.7352 0.455853C9.48828 0.248041 8.21953 0.655463 7.32812 1.54687L7 1.87499L6.67188 1.54687C5.78047 0.655463 4.51172 0.248041 3.26484 0.455853C1.38086 0.770306 0 2.39999 0 4.31132V4.46992C0 5.60468 0.470312 6.69023 1.30156 7.46406Z" fill="#F42828"/>
                        </svg>
                    </div>
                )
                : 
                (
                    <div onClick={(e) => addFavorite(data.id, e)} className={classes.favorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                        <path d="M1.30156 7.46406L6.24258 12.0769C6.44766 12.2684 6.71836 12.375 7 12.375C7.28164 12.375 7.55234 12.2684 7.75742 12.0769L12.6984 7.46406C13.5297 6.69023 14 5.60468 14 4.46992V4.31132C14 2.39999 12.6191 0.770306 10.7352 0.455853C9.48828 0.248041 8.21953 0.655463 7.32812 1.54687L7 1.87499L6.67188 1.54687C5.78047 0.655463 4.51172 0.248041 3.26484 0.455853C1.38086 0.770306 0 2.39999 0 4.31132V4.46992C0 5.60468 0.470312 6.69023 1.30156 7.46406Z" fill="#6D6A6A"/>
                        </svg>
                    </div>
                )
}
            <div className={classes.image}>
                <img src={`${import.meta.env.VITE_API_URL}/${data.img}`} alt="Картинок пока нет : (" />
            </div>
            <div className={classes.info}>
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
                                onClick={(e) => {e.stopPropagation(), setPalette(e.target.value)}}
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
                    {/* {
                        basketItem?.productId == data.id ? (
                            <button>Товар добавлен</button>
                        ) : (
                            <button onClick={(e) => addBasket(data, e)} className={classes.card}>Добавить в корзину</button>
                        )
                    } */}
                    <button onClick={(e) => addBasket(data, e)} className={classes.card}>Добавить в корзину</button>
                </div>           
            </div>
        </div>
    </div>
  )
}

export default Product