import React, { useEffect } from 'react'
import classes from './style.module.scss'
import { useGetByTypeProductQuery } from '../../../services/product'
import Product from '../../../components/product/product'
import type { IProduct } from '../../../types'
import { useParams } from 'react-router'
const CatalogId = () => {
    let param = useParams()
    const { data, error, isLoading } = useGetByTypeProductQuery(param.id as string)
    return (
        <div className={classes.wrapper}>
        {error ? (
            <>Oh no, there was an error</>
        ) : isLoading ? (
            <>Loading...</>
        ) : data ? (
            <div className={classes.container}>
            {data.map((item: IProduct) => (
                <Product data = {item} />
            ))}
            </div>
        ) : null}
        </div>
    )
}

export default CatalogId