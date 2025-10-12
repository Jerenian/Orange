import React from 'react'
import type { ITypesProps } from '../../types'
import classes from './style.module.scss'
import { NavLink } from 'react-router'
import img from '../../assets/images/pages/main/flowers.png'
import { useSelector } from 'react-redux'
const MainCatalog = ({data} : ITypesProps) => {
    console.log(data?.img)
    return (
        <div className={classes.container}>
            <NavLink to={`/catalog/${data.id}`} >
                <div className={classes.shadow} ></div> 
                    <img src={img} alt="" />
                <h4>{data.name}</h4>
                <p>От {data.price} рублей</p>
            </NavLink>
        </div>
    )
}

export default MainCatalog
