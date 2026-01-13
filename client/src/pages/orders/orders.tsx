import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './style.module.scss'
import { addHandedState, removeOrder } from '../../features/orderSlice/orderSlice'
import { useRemoveOrderMutation,  useChangeOrderMutation } from '../../services/order'
import { changeProductInfo } from '../../features/modalSlice/ModalSlice'
import type { IProduct } from '../../types'
const Orders = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state:any) => state.orders)
    const products = useSelector((state: any) => state.product.data)
    const [remove] = useRemoveOrderMutation()
    const [setHanded] = useChangeOrderMutation()
    const dataTypes = useSelector((state: any) => state.type.types)
    const [error, setError] = useState({handed:'', remove:''})
    const hendleRemove = async (id:string) => {
        await remove(id)
        dispatch(removeOrder(id))
    }


    let typeName: any
    const getType = (item: IProduct): void => {
        dataTypes?.map((type:IProduct) => {
            type.id === item.typeId ? typeName = type.name : null
        })
    }
    const showProduct = (id:string) => {
        const item = products.filter((el: IProduct) => el.id === id)
        dispatch(changeProductInfo(item[0]))
    }
    const hendleHanded = async (id: string) => {
        const handed = await setHanded(id as any)
        setError({...error, handed: ""})
        if(handed?.data) {
            dispatch(addHandedState(id))
        } else {
            setError({...error, handed: "Не удалось изменить статус заказа"})
        }
    }
    const getDateTime = (dateStr: string): string => {
        const date = new Date(dateStr);
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        const result = `${day}.${month}.${year} ${hours}:${minutes}`;
        return result
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <div className={classes.active}>
                    <div className={classes.container}>
                        <div className={classes.title}>
                            <h2 className={classes.item}>
                                Список активных заказов
                            </h2>
                        </div>
                        {
                            orders?.active.length ? (
                                <div className={classes.column}>
                                    {
                                        orders?.active?.map((item: any) => (
                                            <div className={classes.order}>
                                                <div className={classes.orderItem}>
                                                        <div className={classes.info}>
                                                        <h2 className={classes.item}>
                                                            Номер заказа : {item.id}
                                                        </h2>
                                                            <div className={classes.date}>
                                                                <p>{getDateTime(item.createdAt)}</p>
                                                            </div>
                                                            <div className={classes.products}>
                                                                <div className={classes.title}>
                                                                    <h4 className={classes.item}>
                                                                        Состав заказ
                                                                    </h4>
                                                                </div>
                                                                <div className={classes.date}>
                                                                    <p>{getDateTime(item.createdAt)}</p>
                                                                </div>
                                                                <div className={classes.productContainer}>
                                                                {
                                                                    item?.products.map((product: any) => (
                                                                        <div onClick={() => showProduct(product.id)} className={classes.item} >
                                                                            <p>{product.name} : {product.quantity} шт</p>
                                                                            {
                                                                                product?.selectPalette ? (
                                                                                    <div className={classes.palette}>
                                                                                        <p>Цвет : </p>
                                                                                        {
                                                                                            getType(product) as any
                                                                                        }
                                                                                        {
                                                                                            typeName?.toString().toUpperCase() == "ОТКРЫТКИ" ?  (
                                                                                                <p className={classes.numberItem} >
                                                                                                    {product.selectPalette}
                                                                                                </p>
                                                                                            ) : (
                                                                                                <p style={{background: product.selectPalette}} className={classes.paletteItem}></p>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                ): null
                                                                            }
                                                                        </div>
                                                                    ))
                                                                }
                                                                </div>
                                                            </div>
                                                            <div className={classes.price} >
                                                                <p> Цена - {item.price}</p>
                                                            </div>
                                                            <div className={classes.status}>
                                                                {
                                                                    item.status == 'succeeded' ? (
                                                                        <p className={classes.succeeded}>
                                                                            Оплачено
                                                                        </p>
                                                                    ) : item.status == 'pending' ? (
                                                                        <p className={classes.pending}>
                                                                            Оплата ожидает подтверждения
                                                                        </p>
                                                                    ) : (
                                                                        <p className={classes.error}>
                                                                            Не оплачено
                                                                        </p>
                                                                    )                                                                  
                                                                }
                                                            </div>
                                                            <div className={classes.delivery}>
                                                                {
                                                                    item.delivery ? (
                                                                        <div className={classes.deliveryItem} >
                                                                            Доставить по адресу - {item.address}
                                                                        </div>
                                                                    ) : (
                                                                        <div className={classes.noDelivery} >
                                                                            Самовывоз из магазина - {item.shop}
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={classes.user}>
                                                                <div className={classes.container}>
                                                                    <div className={classes.title}>
                                                                        <h4 className={classes.item}>
                                                                            Контактная информация
                                                                        </h4>
                                                                    </div>
                                                                    <div className={classes.content}>
                                                                       {
                                                                            item.name || item.surname ? 
                                                                            ( 
                                                                               <div className={classes.name}>
                                                                                    <p> Имя : {item.name} {item.surname}</p>
                                                                                </div>
                                                                            ) : null
                                                                       }
                                                                       {
                                                                            item.email ? 
                                                                            (
                                                                                <div className={classes.email}>
                                                                                    <p>
                                                                                        Email: {item.email}
                                                                                    </p>
                                                                                </div>
                                                                            ) : null
                                                                       }
                                                                        <div className={classes.phone}>
                                                                            <p>
                                                                                Телефон: {item.phone}
                                                                            </p>
                                                                        </div>
                                                                        {
                                                                            item.comment ? 
                                                                            (
                                                                                <div className={classes.comment}>
                                                                                    <p>
                                                                                        Комментарий : {item.comment}
                                                                                    </p>
                                                                                </div>
                                                                            ) : null
                                                                        }
                                                                        <div className={classes.changeStatus}>
                                                                            <button
                                                                            onClick={() => hendleHanded(item.id)}
                                                                             className={classes.item}>
                                                                                Заказ вручен ?
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className={classes.nothing}>
                                    <p>Активных заказов пока нет</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={classes.data}>
                    <div className={classes.container}>
                        <div className={classes.title}>
                            <h2 className={classes.item}>
                                Все заказы
                            </h2>
                        </div>
                        {
                            orders?.data ? (
                                <div className={classes.column}>
                                    {
                                        orders?.data?.map((item: any) => (
                                            <div className={classes.order}>
                                                <div className={classes.orderItem}>
                                                    <div className={classes.title}>
                                                        <button onClick={() => hendleRemove(item.id)} className={classes.remove}>
                                                            Удалить
                                                        </button>
                                                    </div>
                                                        <div className={classes.info}>
                                                        <h2 className={classes.item}>
                                                            Номер заказа : {item.id}
                                                        </h2>
                                                            <div className={classes.date}>
                                                                <p>{getDateTime(item.createdAt)}</p>
                                                            </div>
                                                            <div className={classes.products}>
                                                                <div className={classes.title}>
                                                                    <h4 className={classes.item}>
                                                                        Состав заказ
                                                                    </h4>
                                                                </div>

                                                                <div className={classes.productContainer}>
                                                                {
                                                                    item?.products.map((product: any) => (
                                                                        <div>
                                                                            <p>{product.name} : {product.quantity} шт</p>
                                                                        </div>
                                                                    ))
                                                                }
                                                                </div>
                                                            </div>
                                                            <div className={classes.price} >
                                                                <p> Цена - {item.price}</p>
                                                            </div>
                                                            <div className={classes.status}>
                                                                {
                                                                    item.status == 'succeeded' ? (
                                                                        <p className={classes.succeeded}>
                                                                            Оплачено
                                                                        </p>
                                                                    ) : item.status == 'pending' ? (
                                                                        <p className={classes.pending}>
                                                                            Оплата ожидает подтверждения
                                                                        </p>
                                                                    ) : (
                                                                        <p className={classes.error}>
                                                                            Не оплачено
                                                                        </p>
                                                                    )                                                                  
                                                                }
                                                            </div>
                                                            <div className={classes.delivery}>
                                                                {
                                                                    item.delivery ? (
                                                                        <div className={classes.deliveryItem} >
                                                                            Доставить по адресу - {item.address}
                                                                        </div>
                                                                    ) : (
                                                                        <div className={classes.noDelivery} >
                                                                            Самовывоз из магазина - {item.shop}
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={classes.user}>
                                                                <div className={classes.container}>
                                                                    <div className={classes.title}>
                                                                        <h4 className={classes.item}>
                                                                            Контактная информация
                                                                        </h4>
                                                                    </div>
                                                                    <div className={classes.content}>
                                                                       {
                                                                            item.name || item.surname ? 
                                                                            ( 
                                                                               <div className={classes.name}>
                                                                                    <p> Имя : {item.name} {item.surname}</p>
                                                                                </div>
                                                                            ) : null
                                                                       }
                                                                       {
                                                                            item.email ? 
                                                                            (
                                                                                <div className={classes.email}>
                                                                                    <p>
                                                                                        Email: {item.email}
                                                                                    </p>
                                                                                </div>
                                                                            ) : null
                                                                       }
                                                                        <div className={classes.phone}>
                                                                            <p>
                                                                                Телефон: {item.phone}
                                                                            </p>
                                                                        </div>
                                                                        {
                                                                            item.comment ? 
                                                                            (
                                                                                <div className={classes.comment}>
                                                                                    <p>
                                                                                        Комментарий : {item.comment}
                                                                                    </p>
                                                                                </div>
                                                                            ) : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className={classes.nothing}>
                                    История заказов пуста
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders