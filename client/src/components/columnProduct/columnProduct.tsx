import React, { useEffect, useState } from 'react'
import classes from './style.module.scss'
import type { IProductProps } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { changePaymentModal } from '../../features/modalSlice/modalSlice'
import flower from '../../assets/images/pages/main/flowers.png'
import { useAddFavoriteMutation } from '../../services/favorite'
import Modal from '../modal/Modal'
import { useNavigate } from 'react-router'
import { getFavorite } from '../../features/favoriteSlice/favoriteSlice'
import { getBasket, setAmount } from '../../features/basketSlice/basketSlice'
import { changeProductInfo } from '../../features/modalSlice/modalSlice'
import { useAddBasketMutation } from '../../services/basket'
const ColumnProduct = ({data, allProduct}) => {
    const [setFavorite ] = useAddFavoriteMutation()
    const [setBasket] = useAddBasketMutation()
    const dataFavorites = useSelector(state => state.favorite.data)
    const dataBasket = useSelector(state => state.basket.quantity)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    dataBasket.map((item) => {
        const id = item.productId
        
        allProduct = allProduct.map(product => {
            if(product?.id === id) {
                return {
                    ...product, quantity: item.quantity
                }
            } else {
                return {
                    ...product
                }
            }
        })
    })
    dataBasket.map((item) => {
        const id = item.productId
        const {quantity} = item
        if(id == data.id) {
            data = {...data, quantity }
        }
    })
    const like = dataFavorites?.find(item => item.productId == data.id)
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
    const addBasket = async(id, e) => {
        e.stopPropagation()
        const basket = await setBasket(id)
        const data = basket
        if(data?.error?.status){
            navigate('/login')
        }
        if(!data?.error) {
            dispatch(getBasket(data.data))
        }
}
  return (
    <div onClick={() => dispatch(changeProductInfo(data))} className={classes.wrapper}>
        
        <div className={classes.container}>

            <div className={classes.image}>
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
                <img src={`${import.meta.env.VITE_API_URL}/${data.img}`} alt="Картинок пока нет : (" />
            </div>
            <div className={classes.info}>
                <div className={classes.title}>
                    <h4>{data.name}</h4>
                    <p>Количество {data.quantity}</p>
                </div>
                <div className={classes.priceContainer}>
                    <p>{data.price} ₽ </p>
                    
                </div>           
            </div>
        </div>
    </div>
  )
}

export default ColumnProduct