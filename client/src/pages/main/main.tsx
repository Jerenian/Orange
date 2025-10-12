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
import { useDispatch, useSelector } from 'react-redux'
import { useCheckQuery, useRefreshQuery } from '../../services/user'
import { useGetFavoriteQuery } from '../../services/favorite'
import { MoonLoader } from 'react-spinners'
import Spinner from 'react-bootstrap/Spinner';
import { changeTypeModal } from '../../features/modalSlice/modalSlice'
import { Oval } from 'react-loader-spinner'




const Main = (props) => {
    const dataFavorite = useGetFavoriteQuery(null)
    const dataTypes = useGetAllTypesQuery(null)
    const dataProducts = useGetAllProductsQuery(null)
    const dataPopular = dataProducts.data?.filter((item) => item.isPopular)
    const typePrice = useSelector(state => state.type.product)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()
    
    const user = useCheckQuery(null)

    const mergerDataTypes = dataTypes.data?.map((type:any) => {
        const prices = typePrice.find((item: any) => item.typeId === type.id)
        return {...type, price: prices?.items}
    })
    const hendleClick = () => {
        dispatch(changeTypeModal())
    }
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
                        {
                            user?.data?.role === 'admin' ? (
                                <div onClick={() => hendleClick()}  className={classes.createType}>
                                    <svg viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fb9a8d" stroke="#fb9a8d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M220.5 245.4c-32.8 32.8-55.1 73.2-65.2 117.3h16.5c18.8-75.3 75.1-135.9 148-160.7v-16.9c-37.1 11.6-71 32-99.3 60.3z" fill="#fb9a8d"></path><path d="M959.9 540.8c0 113.6-92.1 205.8-205.7 205.9H590.9v-44h163.3c43.2 0 83.8-16.9 114.3-47.4 30.6-30.6 47.4-71.2 47.4-114.5 0-43.2-16.8-83.9-47.4-114.4S797.2 379 754 379c-11.5 0-22.8 1.2-33.8 3.5-15 3.2-29.4 8.4-42.8 15.7-1-15.4-3.3-30.7-6.8-45.6v-0.1c-3.6-15.6-8.6-30.8-14.9-45.7-14.4-33.9-34.9-64.4-61.1-90.6-26.2-26.2-56.6-46.7-90.6-61.1-35.1-14.8-72.4-22.4-110.9-22.4s-75.8 7.5-110.9 22.4c-33.9 14.3-64.4 34.9-90.6 61.1-26.2 26.2-46.7 56.7-61.1 90.6-14.9 35.1-22.4 72.4-22.4 110.9s7.5 75.8 22.4 110.9c14.3 33.9 34.9 64.4 61.1 90.6 26.2 26.2 56.7 46.7 90.6 61.1 35.1 14.8 72.4 22.4 110.9 22.4h39.7v44h-41C210.7 746 64.1 599 64.1 417.7c0-181.7 147.3-329 329-329 154.6 0 284.3 106.6 319.5 250.3v0.1c13.4-2.7 27.2-4.2 41.4-4.2 113.7 0.1 205.9 92.2 205.9 205.9z" fill="#fb9a8d"></path><path d="M692.9 636.1h-22.6L519.8 485.6v449.6h-16V485.8L353.4 636.1h-22.6l181-181z" fill="#fb9a8d"></path></g></svg>
                                    <p>
                                        добавить <br /> категорию
                                    </p>
                                </div>
                            ) : null
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