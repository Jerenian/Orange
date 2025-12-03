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
import { MoonLoader } from 'react-spinners'
import Spinner from 'react-bootstrap/Spinner';
import { changeDeleteType, changeEditType, changePaymentModal, changeTypeModal } from '../../features/modalSlice/modalSlice'
import { Oval } from 'react-loader-spinner'
import { useRemoveTypeMutation } from '../../services/remove'
import { useChangePopularMutation } from '../../services/change'
import { useGetProductsMutation } from '../../services/favorite'
import { allProducts, minPriceOfTheType } from '../../features/productSlice/ProductSlice'
const Main = (props) => {
    const dataTypes = useGetAllTypesQuery(null)
    const dataProducts = useGetAllProductsQuery(null)
    const dataPopular = dataProducts.data?.filter((item) => item.isPopular)
    const typePrice = useSelector(state => state.type.product)
    const dispatch = useDispatch()
    const [removePopular] = useChangePopularMutation()
    const user = useCheckQuery(null)
    const mergerDataTypes = dataTypes.data?.map((type:any) => {
        const prices = typePrice.find((item: any) => item.typeId === type.id)
        return {...type, price: prices?.items}
    })

    const hendleClick = () => {
        dispatch(changeTypeModal())
    }
    const hendleRemove = async (id:string) => {
        dispatch(changeDeleteType(id))
    }
    const hendleEdit = (data) => { 
        dispatch(changeEditType({...data}))
    }
    const hendlePayment = () => {
        dispatch(changePaymentModal())
    }
    const hendleRemovePopular = async (id:string) => {
        const remPop = await removePopular(id)
        window.location.reload()
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
                    <h1 className={classes.title}>Свежие цветы каждый день</h1>
                    <p className={classes.subTitle}>Создаем букеты с душой для особых моментов вашей жизни</p>
                    <div className={classes.button}>
                        <button onClick={() => hendlePayment()} className={classes.btnFirst} >Заказть букет</button>
                        <NavLink className={classes.btnSecond} to="/catalog">
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
                        <h2 className={classes.title}>Каталог товаров</h2>
                        <p className={classes.subTitle}>Исследуйте нашу коллекцию и найдите то, что нужно вам</p>
                    </div>
                    <nav className={classes.container}>
                        
                {
                    mergerDataTypes?.map((item: any) => (
                    <div className={classes.rowContainer}>
                    { user?.data?.role === 'admin' ? (
                                <div className={classes.row}>
                                    <button className={classes.remove} onClick={() => hendleRemove(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                    <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="black"/>
                                    </svg>
                                    </button>
                                    <button onClick={() => hendleEdit(item)} className={classes.update}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M3 16.0012H7.24C7.37161 16.0019 7.50207 15.9767 7.62391 15.927C7.74574 15.8772 7.85656 15.8039 7.95 15.7112L14.87 8.78325L17.71 6.00406C17.8037 5.91112 17.8781 5.80055 17.9289 5.67873C17.9797 5.55691 18.0058 5.42624 18.0058 5.29426C18.0058 5.16229 17.9797 5.03162 17.9289 4.9098C17.8781 4.78797 17.8037 4.67741 17.71 4.58447L13.47 0.295713C13.377 0.202011 13.2664 0.127639 13.1446 0.0768846C13.0227 0.0261307 12.892 0 12.76 0C12.628 0 12.4973 0.0261307 12.3754 0.0768846C12.2536 0.127639 12.143 0.202011 12.05 0.295713L9.23 3.12489L2.29 10.0529C2.19732 10.1463 2.12399 10.2571 2.07423 10.3789C2.02446 10.5007 1.99924 10.6311 2 10.7627V15.0014C2 15.2666 2.10536 15.5209 2.29289 15.7084C2.48043 15.8958 2.73478 16.0012 3 16.0012ZM12.76 2.4151L15.59 5.24428L14.17 6.66387L11.34 3.83469L12.76 2.4151ZM4 11.1726L9.93 5.24428L12.76 8.07346L6.83 14.0017H4V11.1726ZM19 18.0006H1C0.734784 18.0006 0.48043 18.1059 0.292893 18.2934C0.105357 18.4809 0 18.7352 0 19.0003C0 19.2654 0.105357 19.5197 0.292893 19.7072C0.48043 19.8947 0.734784 20 1 20H19C19.2652 20 19.5196 19.8947 19.7071 19.7072C19.8946 19.5197 20 19.2654 20 19.0003C20 18.7352 19.8946 18.4809 19.7071 18.2934C19.5196 18.1059 19.2652 18.0006 19 18.0006Z" fill="black"/>
                                    </svg>
                                    </button> 
                                <MainCatalog data={item}></MainCatalog>
                                </div>
                        ) : 
                                <div className={classes.row}>
                                    <MainCatalog data={item}></MainCatalog>
                                </div>
                    }
                    </div>
                ))
                }
                        {
                            user?.data?.role === 'admin' ? (
                                <div onClick={() => hendleClick()}  className={classes.createType}>
                                    <svg viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fb9a8d" stroke="#fb9a8d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M220.5 245.4c-32.8 32.8-55.1 73.2-65.2 117.3h16.5c18.8-75.3 75.1-135.9 148-160.7v-16.9c-37.1 11.6-71 32-99.3 60.3z" fill="#fb9a8d"></path><path d="M959.9 540.8c0 113.6-92.1 205.8-205.7 205.9H590.9v-44h163.3c43.2 0 83.8-16.9 114.3-47.4 30.6-30.6 47.4-71.2 47.4-114.5 0-43.2-16.8-83.9-47.4-114.4S797.2 379 754 379c-11.5 0-22.8 1.2-33.8 3.5-15 3.2-29.4 8.4-42.8 15.7-1-15.4-3.3-30.7-6.8-45.6v-0.1c-3.6-15.6-8.6-30.8-14.9-45.7-14.4-33.9-34.9-64.4-61.1-90.6-26.2-26.2-56.6-46.7-90.6-61.1-35.1-14.8-72.4-22.4-110.9-22.4s-75.8 7.5-110.9 22.4c-33.9 14.3-64.4 34.9-90.6 61.1-26.2 26.2-46.7 56.7-61.1 90.6-14.9 35.1-22.4 72.4-22.4 110.9s7.5 75.8 22.4 110.9c14.3 33.9 34.9 64.4 61.1 90.6 26.2 26.2 56.7 46.7 90.6 61.1 35.1 14.8 72.4 22.4 110.9 22.4h39.7v44h-41C210.7 746 64.1 599 64.1 417.7c0-181.7 147.3-329 329-329 154.6 0 284.3 106.6 319.5 250.3v0.1c13.4-2.7 27.2-4.2 41.4-4.2 113.7 0.1 205.9 92.2 205.9 205.9z" fill="#fb9a8d"></path><path d="M692.9 636.1h-22.6L519.8 485.6v449.6h-16V485.8L353.4 636.1h-22.6l181-181z" fill="#fb9a8d"></path></g></svg>
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
                            <h2 className={classes.title}>Популярное</h2>
                            <p className={classes.subTitle}>Самые любимые композиции наших клиентов</p>
                        </div>
                        <div className={classes.container}
                        >
                            {
                                dataPopular?.map((item) => (
                                    <div className={classes.rowContainer}>
                                        {
                                            user?.data?.role === 'admin' ? (
                                            
                                            <div className={classes.row}>
                                                <button className={classes.remove} onClick={() => hendleRemovePopular(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                                    <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="black"/>
                                                    </svg>
                                                </button>
                                                <MainPopular data = {item}></MainPopular>
                                            </div>
                                            ) : <div className={classes.row}> <MainPopular data = {item}></MainPopular></div>
                                        }
                                    </div>
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