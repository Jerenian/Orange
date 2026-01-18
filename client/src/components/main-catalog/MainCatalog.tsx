
import type { ITypesProps } from '../../types'
import classes from './style.module.scss'
import { NavLink } from 'react-router'
const MainCatalog = ({data} : ITypesProps) => {
    return (
        <div className={classes.container}>
            <NavLink className={classes.link} to={`/catalog/${data.id}`} >
                <div className={classes.shadow} ></div> 
                    <img
                    decoding="async"
                    loading="lazy"
                    src={`${import.meta.env.VITE_API_URL}${data.img}`} alt="" />
                <h4>{data.name}</h4>
                <p>От {data.price} рублей</p>
            </NavLink>
        </div>
    )
}

export default MainCatalog
