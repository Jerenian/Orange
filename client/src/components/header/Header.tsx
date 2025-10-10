import React, { useEffect } from 'react'
import classes from './Header.module.scss'
import { NavLink } from "react-router";
import logo from "../../assets/logo.png"
import { useSelector } from 'react-redux';
const Header = () => {
    const favorite = useSelector(state => state.favorite.data)
  return (
    <div className={classes.wrapper}>
        <div className={classes.row}>
            <nav className={classes.left}>
                <NavLink to="/"><img className={classes.logo} src={logo} alt="logo" /></NavLink>
                <NavLink className={classes.link} to="about">О нас</NavLink>
                <NavLink className={classes.link} to="/contact">Контакты</NavLink>
                {/* <NavLink className={classes.link} to="/payment">Оплата</NavLink> */}
                <NavLink className={classes.link} to="/delivery">Доставка</NavLink>
            </nav>
            <nav className={classes.right}>
                <NavLink to="/favorite">
                    <div className={classes.likeCouner}>{favorite.length ? favorite.length : 0}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">

                        <path d="M1.67344 10.8109L8.02617 16.7418C8.28984 16.9879 8.63789 17.125 9 17.125C9.36211 17.125 9.71016 16.9879 9.97383 16.7418L16.3266 10.8109C17.3953 9.81602 18 8.42032 18 6.96133V6.75743C18 4.30001 16.2246 2.20469 13.8023 1.8004C12.1992 1.53321 10.568 2.05704 9.42188 3.20313L9 3.62501L8.57812 3.20313C7.43203 2.05704 5.80078 1.53321 4.19766 1.8004C1.77539 2.20469 0 4.30001 0 6.75743V6.96133C0 8.42032 0.604687 9.81602 1.67344 10.8109Z" fill="white"/>
                    </svg>
                </NavLink>
                {/* <NavLink to="/favorite">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                        <g clip-path="url(#clip0_1_331)">
                        <path d="M5.625 4.1875C5.625 2.94648 6.63398 1.9375 7.875 1.9375C9.11602 1.9375 10.125 2.94648 10.125 4.1875V5.875H5.625V4.1875ZM3.9375 5.875H1.6875C0.755859 5.875 0 6.63086 0 7.5625V14.875C0 16.7383 1.51172 18.25 3.375 18.25H12.375C14.2383 18.25 15.75 16.7383 15.75 14.875V7.5625C15.75 6.63086 14.9941 5.875 14.0625 5.875H11.8125V4.1875C11.8125 2.01133 10.0512 0.25 7.875 0.25C5.69883 0.25 3.9375 2.01133 3.9375 4.1875V5.875ZM4.78125 7.5625C5.00503 7.5625 5.21964 7.65139 5.37787 7.80963C5.53611 7.96786 5.625 8.18247 5.625 8.40625C5.625 8.63003 5.53611 8.84464 5.37787 9.00287C5.21964 9.16111 5.00503 9.25 4.78125 9.25C4.55747 9.25 4.34286 9.16111 4.18463 9.00287C4.02639 8.84464 3.9375 8.63003 3.9375 8.40625C3.9375 8.18247 4.02639 7.96786 4.18463 7.80963C4.34286 7.65139 4.55747 7.5625 4.78125 7.5625ZM10.125 8.40625C10.125 8.18247 10.2139 7.96786 10.3721 7.80963C10.5304 7.65139 10.745 7.5625 10.9688 7.5625C11.1925 7.5625 11.4071 7.65139 11.5654 7.80963C11.7236 7.96786 11.8125 8.18247 11.8125 8.40625C11.8125 8.63003 11.7236 8.84464 11.5654 9.00287C11.4071 9.16111 11.1925 9.25 10.9688 9.25C10.745 9.25 10.5304 9.16111 10.3721 9.00287C10.2139 8.84464 10.125 8.63003 10.125 8.40625Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1_331">
                        <path d="M0 0.25H15.75V18.25H0V0.25Z" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </NavLink> */}
                <NavLink to='/login'>
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