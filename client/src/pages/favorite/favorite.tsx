import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Product from '../../components/product/product'
import { useGetProductsMutation } from '../../services/favorite'
import type { IProductProps } from '../../types'
const Favorite = () => {
    const favorite = useSelector(state => state.favorite.data)
    const getId = favorite?.map(item => item.productId)
    const [products] = useGetProductsMutation()
    //let dataProducts = products(getId)
    

    return (
        <div>
            {
                // dataProducts?.data.map( item => (
                //     <Product data={item}></Product>
                // ))
            }
        </div>
    )
}

export default Favorite