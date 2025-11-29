import React, { useEffect, useState } from 'react'
import classes from './style.module.scss'
import {useDispatch } from 'react-redux'
import { searchItems } from '../../features/productSlice/ProductSlice'
const Field = () => {
    const [fieldValue, setFieldValue] = useState('')
    const dispatch = useDispatch()
    dispatch(searchItems(fieldValue))
    
    const hendleSearch = (e) => {
        setFieldValue(state => e.target.value)
    }
    return (
        <div className={classes.field}>
            <input
            value={fieldValue}
            className={classes.item}
            onChange = {(e) => hendleSearch(e)}
            type="text"
            placeholder='Поиск'
            />
        </div>
    )
}

export default Field