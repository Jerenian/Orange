import React, { useEffect } from 'react'
import classes from './Header.module.scss'
import { data, NavLink } from "react-router";
import logo from "../../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { changeMenu } from '../../features/modalSlice/modalSlice';
import Field from '../search/field';
import SearchBlock from '../search/searchBlock';
import { searchItems } from '../../features/productSlice/ProductSlice';
const Header = () => {
    const favorite = useSelector((state: any) => state.favorite.data)
    const basket = useSelector((state: any) => state.basket.quantity)
    const user = useSelector((state: any) => state.user)
    const orders = useSelector((state: any) => state.orders.active)
    const dispatch = useDispatch()
  return (
    <div className={classes.wrapper}>
        <div className={classes.row}>
            <div onClick={() => dispatch(changeMenu(null))} className={classes.burger}>
                <div className={classes.item}>
                    <p className={classes.line}></p>
                    <p className={classes.line}></p>
                    <p className={classes.line}></p>
                </div>
            </div>
            <nav
            onClick={() => dispatch(searchItems(''))}
             className={classes.left}>
                <NavLink to="/"><img decoding="async" loading='lazy' className={classes.logo} src={logo} alt="logo" /></NavLink>
                <NavLink className={classes.link} to="about">О нас</NavLink>
                <NavLink className={classes.link} to="/contact">Контакты</NavLink>
                <NavLink className={classes.link} to="/delivery">Доставка</NavLink>
            </nav>
            <nav className={classes.center}>
                <div className={classes.searchBlock}>
                    <Field></Field>
                    <SearchBlock></SearchBlock>
                </div>
            </nav>
            <nav
             onClick={() => dispatch(searchItems(''))}
             className={classes.right}>
                {user?.data?.role === 'admin' ? (<p className={classes.adminText} >администратор</p>): null} 
                <NavLink to="/favorite">
                    <div className={classes.likeCouner}>{favorite?.length ? favorite?.length : 0}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">

                        <path d="M1.67344 10.8109L8.02617 16.7418C8.28984 16.9879 8.63789 17.125 9 17.125C9.36211 17.125 9.71016 16.9879 9.97383 16.7418L16.3266 10.8109C17.3953 9.81602 18 8.42032 18 6.96133V6.75743C18 4.30001 16.2246 2.20469 13.8023 1.8004C12.1992 1.53321 10.568 2.05704 9.42188 3.20313L9 3.62501L8.57812 3.20313C7.43203 2.05704 5.80078 1.53321 4.19766 1.8004C1.77539 2.20469 0 4.30001 0 6.75743V6.96133C0 8.42032 0.604687 9.81602 1.67344 10.8109Z" fill="white"/>
                    </svg>
                </NavLink>
                <NavLink to='/basket'>
                    <div className={classes.likeCouner}>{basket?.length ? basket[0].productId !== '' ? basket.length : 0 : 0}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                    <g clipPath="url(#clip0_56_4575)">
                    <path d="M5.625 3.9375C5.625 2.69648 6.63398 1.6875 7.875 1.6875C9.11602 1.6875 10.125 2.69648 10.125 3.9375V5.625H5.625V3.9375ZM3.9375 5.625H1.6875C0.755859 5.625 0 6.38086 0 7.3125V14.625C0 16.4883 1.51172 18 3.375 18H12.375C14.2383 18 15.75 16.4883 15.75 14.625V7.3125C15.75 6.38086 14.9941 5.625 14.0625 5.625H11.8125V3.9375C11.8125 1.76133 10.0512 0 7.875 0C5.69883 0 3.9375 1.76133 3.9375 3.9375V5.625ZM4.78125 7.3125C5.00503 7.3125 5.21964 7.40139 5.37787 7.55963C5.53611 7.71786 5.625 7.93247 5.625 8.15625C5.625 8.38003 5.53611 8.59464 5.37787 8.75287C5.21964 8.91111 5.00503 9 4.78125 9C4.55747 9 4.34286 8.91111 4.18463 8.75287C4.02639 8.59464 3.9375 8.38003 3.9375 8.15625C3.9375 7.93247 4.02639 7.71786 4.18463 7.55963C4.34286 7.40139 4.55747 7.3125 4.78125 7.3125ZM10.125 8.15625C10.125 7.93247 10.2139 7.71786 10.3721 7.55963C10.5304 7.40139 10.745 7.3125 10.9688 7.3125C11.1925 7.3125 11.4071 7.40139 11.5654 7.55963C11.7236 7.71786 11.8125 7.93247 11.8125 8.15625C11.8125 8.38003 11.7236 8.59464 11.5654 8.75287C11.4071 8.91111 11.1925 9 10.9688 9C10.745 9 10.5304 8.91111 10.3721 8.75287C10.2139 8.59464 10.125 8.38003 10.125 8.15625Z" fill="white"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_56_4575">
                    <path d="M0 0H15.75V18H0V0Z" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </NavLink>
                {
                    user?.data.role === "admin" ? (
                    <NavLink to='/orders'>
                        <div className={classes.likeCouner}>{orders?.length ? orders?.length : 0}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFF"><path d="M192-216v-72h48v-240q0-87 53.5-153T432-763v-53q0-20 14-34t34-14q20 0 34 14t14 34v53q85 16 138.5 82T720-528v240h48v72H192Zm288-276Zm-.21 396Q450-96 429-117.15T408-168h144q0 30-21.21 51t-51 21ZM312-288h336v-240q0-70-49-119t-119-49q-70 0-119 49t-49 119v240Z"/></svg>
                    </NavLink>
                    ) : null
                }
                <NavLink to='/user'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 9C11.4752 9 13.5 6.97495 13.5 4.5C13.5 2.02505 11.4752 0 9 0C6.52477 0 4.5 2.02505 4.5 4.5C4.5 6.97495 6.52477 9 9 9ZM9 11.25C6.01884 11.25 0 12.7688 0 15.75V18H18V15.75C18 12.7688 11.9812 11.25 9 11.25Z" fill="white"/>
                </svg>
                </NavLink>
                
            </nav>
        </div>
    </div>
  )
}

export default Header