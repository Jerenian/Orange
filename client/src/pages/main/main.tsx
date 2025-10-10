import React, { useEffect } from 'react'
import classes from './sytle.module.scss'
import { NavLink } from 'react-router'
import cover from '../../assets/images/mainCover.png'
import flowers from '../../assets/images/pages/main/flowers.png'
import Romantic from '../../assets/images/pages/main/romantic.png'
import classicLove from '../../assets/images/pages/main/classicLove.png'
import { useGetAllTypesQuery } from '../../services/type'
import MainCatalog from '../../components/main-catalog/MainCatalog'
import { useGetAllProductsQuery } from '../../services/product'
import MainPopular from '../../components/main-popular/MainPopular'
import { changeModal } from '../../features/modalSlice/modalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useCheckQuery, useRefreshQuery } from '../../services/user'
import { useGetFavoriteQuery } from '../../services/favorite'
import { MoonLoader } from 'react-spinners'
import Spinner from 'react-bootstrap/Spinner';

import { Oval } from 'react-loader-spinner'




const Main = (props) => {
    const dataFavorite = useGetFavoriteQuery(null)
    const dataTypes = useGetAllTypesQuery(null)
    const dataProducts = useGetAllProductsQuery(null)
    const dataPopular = dataProducts.data?.filter((item) => item.isPopular)
    const typePrice = useSelector(state => state.type.product)
    const dispatch = useDispatch()
    
    const user = useCheckQuery(null)

    const mergerDataTypes = dataTypes.data?.map((type:any) => {
        const prices = typePrice.find((item: any) => item.typeId === type.id)
        return {...type, price: prices?.items}
    })
    console.log(dataFavorite)
    return  ( 
        <div className={classes.wrapper}>
            {user.isLoading || dataTypes.isLoading || dataProducts.isLoading ?  (   
                <div className={classes.loader}>
                    <div className={classes.loaderItem}>
                <Oval
                height="80"
                width="80"
                secondaryColor= '#FB6D41'
                color="#E5FA39"
                ariaLabel="three-dots-loading"
                strokeWidth='3'
                />
                </div> 
                    </div>
              ) : ( 
            <div> 
            <div className={classes.cover}>
                <div className={classes.text}>
                    <h1 className={classes.title}>Свежие цветы <br /> каждый день</h1>
                    <p className={classes.subTitle}>Создаем букеты с душой для особых моментов вашей <br /> жизни</p>
                    <div className={classes.button}>
                        <NavLink to="/catalog">
                        <button className={classes.btnFirst} >Заказть букет</button>
                            <button>
                                Каталог
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className={classes.img}>
                    <img src={cover} alt="" />
                </div>
            </div>
                <section className={classes.catalog}>
                    <div className={classes.text}>
                        <div ></div>
                        <h2 className={classes.title}></h2>
                        <p className={classes.subTitle}></p>
                    </div>
                    <nav className={classes.container}>
                        
                        {
                            mergerDataTypes?.map((item:any) => {
                            return(   
                                <MainCatalog data={item}></MainCatalog>
                            ) 
                            })
                        }
                    </nav>
                </section>
                {
                    dataPopular?.length ? (
                    <section className={classes.popular}>
                        <div className={classes.header}>
                            <h2 className={classes.title}>Популярные букеты</h2>
                            <p className={classes.subTitle}>Самые любимые композиции наших клиентов</p>
                        </div>
                        <div className={classes.container}
                        >
                            {
                                dataPopular?.map((item) => (
                                    <MainPopular data = {item}></MainPopular>
                                ))
                            }
                        </div>
                    </section>
                    ): null
                }
            </div>)}
        </div>
        
    )
}

export default Main
//добавить кнопку оплаты 
// выставить контейнеру display: flex