import React, { useEffect } from 'react'

import { useGetAllProductsQuery } from '../../../services/product'

const Catalog = () => {

    const { data, error, isLoading } = useGetAllProductsQuery(null)
    console.log(data)
  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
        {data.map((item) => (
            <div>
                <div>{item.name}</div>
            </div>
        ))}
        </>
      ) : null}
    </div>
  )
}

export default Catalog