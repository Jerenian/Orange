import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux'
import classes from './style.module.scss'
import { useClearMutation, useGetProductsMutation, usePaymentMutation } from '../../services/basket'
import { Oval } from 'react-loader-spinner'
import { useCheckQuery } from '../../services/user'
import { NavLink } from 'react-router'
import { changePaymentModal } from '../../features/modalSlice/modalSlice'
import ColumnProduct from '../../components/columnProduct/columnProduct'
import MainColumnProduct from '../../components/mainColumnProduct/mainColumnProduct'
import { useCreateOrderMutation } from '../../services/order'
import { getBasket, setAmount, setNames } from '../../features/basketSlice/basketSlice'
import useWindowDimensions from '../../hook'
import { getOrders } from '../../features/orderSlice/orderSlice';
const Basket = () => {
    const basket = useSelector(state => state.basket)
    const [product, {data, isLoading}] = useGetProductsMutation()
    const user = useCheckQuery(null)
    const [contact, setContact] = useState({
        name:'',
        surname:'',
        phone:'',
        email:''
    })
    const [delivery, setDelivery] = useState(true)
    const [address, setAddress] = useState({item: '', comment: ''})
    const [payOnline, setPayOnline] = useState(false)
    const [shop, setShop] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const [payment] = usePaymentMutation()
    const [order] = useCreateOrderMutation()
    const [clear] = useClearMutation()
    useEffect(() => {
        const fn = async () =>  await product(basket.idList)
        fn()
    }, [basket])

    const { width } = useWindowDimensions();
    const hendlePayment = () => {
        dispatch(changePaymentModal())
    }
    // const payload = data?.filter(item => {
    //     return {
    //         name: item.name,
    //         id: item.id
    //     }
    // })
    let updatedData = data?.reduce((acc, item) => {
        const {id} = item
        const res = basket.quantity?.map((product) => {
            if(id == product.productId){
                acc.push({...item, selectPalette: product.palette, quantity: product.quantity})
            }
        })
        return acc 
    },[] as any)
    const cost = updatedData?.map((item: any) =>
        item.price * item.quantity
    ).reduce((x, y) => x + y, 0)
    cost !== undefined ? dispatch(setAmount(cost)) : null
    const Pay  = async () => {
        let data = []
        data.push({email: contact.email, phone: contact.phone, name: contact.name, surname: contact.surname, delivery: delivery, address: address.item, comment: address.comment, payOnline: payOnline, shop: shop, products: updatedData, price: basket.totalAmount})
        if(payOnline){
            const resPayment = delivery ? await payment(basket.totalAmount + 500) : await payment(basket.totalAmount)
            const {confirmation} = resPayment.data
            const {id, status, paid} = resPayment.data
            data = data.map(item => {
                return {
                    ...item,
                    id,
                    status,
                    paid
                }
            })
            window.location.href = confirmation.confirmation_url
        } else {
            data = data.map(item => {
                return {
                    ...item,
                    id: uuidv4()
                }
            })
        }

        const resOrder = await order(data)
        if(resOrder.data){
            dispatch(getOrders(resOrder.data))
        }
        else {
            setError('Произошла ошибка')
        }
    }
    const hendleValudate = () => {
        if(contact.name === '' || contact.email === '' || contact.surname === '' || contact.email === '' ) {
           return setError('Заполните все контактные данные')
        }
        if(!delivery){
            if(shop === ''){
               return setError('Выберте магазин')
            }
        }
        if(delivery){
            if(address.item === ""){
                return setError('Укажите адрес доставки')
            }
        }
        return (setError(''), Pay())
    }
    const hendleClear = async () => {
        const result = await clear('')
        if(result.data === "success"){
            dispatch(getBasket(null))
        } else {
            setError('Не удалось очистить корзину')
        }
    }
    return (
        <div className={classes.wrapper}>
             <div className={classes.cover}>
                <div className={classes.iconContainer}>
                    <svg width="64px" height="64px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=""><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.41600000000000004"></g><g id="SVGRepo_iconCarrier"> <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="#FC8B48"></path> </g></svg>
                </div>
                <div className={classes.text}>
                    <h1 className={classes.title}>Корзина товаров</h1>
                    <div className={classes.button}>
                        <button onClick={() => hendlePayment()} className={classes.btnFirst} >Заказть букет</button>
                        <NavLink to="/catalog">
                            <button>
                                Перейти в каталог
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            {
                isLoading || user.isLoading ? (
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
                ) : user.status === "rejected" ? (
                            <div className={classes.nothing}>
                                <div className={classes.nothingItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                                        <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                                    </svg>
                                </div>
                                <p> Вы не авторизованы </p>
                            </div>
                ) : !data?.length  ? (
                    <div className={classes.nothing}>
                        <div className={classes.nothingItem}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                                <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                            </svg>
                        </div>
                        <p>Вы пока ничего не добавили </p>
                    </div>
                ) :
                (
                <div className={classes.container}>
                    <div className={classes.columnContainer}>
                        {
                            !data?.length ? (
                                <div className={classes.nothing}>
                                    <div className={classes.nothingItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                                            <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                                        </svg>
                                    </div>
                                    <p>Вы пока ничего не добавили </p>
                                </div>
                            ) :
                            updatedData?.map(item => (
                                <div key={item.id} className={classes.row}><MainColumnProduct data={item}></MainColumnProduct></div>
                            ))
                        }
                        {
                            width <= 1260 ? (
                                
                                <div className={classes.bottom}>
                                    <div className={classes.amount}>
                                        <p>Товары</p>
                                        <p>{basket.totalAmount}</p>
                                    </div>
                                    <div className={classes.delivery}>
                                        <p>Доставка</p>
                                        {
                                            delivery ? (
                                                <p>500</p>
                                            ) : (
                                                <p>0</p>
                                            )
                                        }
                                    </div>
                                    <div className={classes.totalAmount}>
                                        <p className={classes.text}>
                                            Итого
                                        </p>
                                        <p className={classes.amount}>
                                            {delivery ? basket.totalAmount + 500 : basket.totalAmount}
                                        </p>
                                    </div>
                                    <div className={classes.payment}>
                                        {
                                        basket?.data?.length ? (
                                            <button
                                            onClick={hendleValudate}
                                            className={classes.payBtn}>Оформить заказ</button>
                                        ) : null
                                        }
                                        <span>{error}</span>
                                    </div>
                                </div>
                            ) : null
                        }
                        {
                            data?.length  ? (
                            <div className={classes.clear}>
                                <div className={classes.clearContiner}>
                                    <button
                                    onClick={hendleClear}>
                                        Очистить корзину
                                    </button>
                                </div>
                            </div>
                            ) : null
                        }
                    </div>
                    <div className={classes.paymentContainer}>
                        <div className={classes.item}>
                        <div className={classes.title}>
                            <h4 className={classes.text}>
                                Ваш заказ
                            </h4>
                        </div>
                            <div className={classes.column}>
                                <div className={classes.container}>
                                    {
                                        !data?.length ? (
                                            <div className={classes.nothing}>
                                                <div className={classes.nothingItem}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                                                        <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                                                    </svg>
                                                </div>
                                                <p>Вы пока ничего не добавили </p>
                                            </div>
                                        ) :
                                        updatedData?.map( item => (
                                            <div key={item.id} className={classes.row}><ColumnProduct allProduct = {data} data={item}></ColumnProduct></div>
                                        ))
                                    }
                                </div>
                                <div className={classes.bottom}>
                                    <div className={classes.amount}>
                                        <p>Товары</p>
                                        <p>{basket.totalAmount}</p>
                                    </div>
                                    <div className={classes.delivery}>
                                        <p>Доставка</p>
                                        {
                                            delivery ? (
                                                <p>500</p>
                                            ) : (
                                                <p>0</p>
                                            )
                                        }
                                    </div>
                                    <div className={classes.totalAmount}>
                                        <p className={classes.text}>
                                            Итого
                                        </p>
                                        <p className={classes.amount}>
                                            {delivery ? basket.totalAmount + 500 : basket.totalAmount}
                                        </p>
                                    </div>
                                    <div className={classes.payment}>
                                        {
                                        basket?.data?.length ? (
                                            <button
                                            onClick={hendleValudate}
                                            className={classes.payBtn}>Оформить заказ</button>
                                        ) : null
                                        }
                                        <span>{error}</span>
                                    </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                )
            }
            {
                data?.length  ? (
                <div className={classes.contact}>
                    <div className={classes.container}>
                        <div className={classes.title} >
                            <h2 className={classes.item}>Контактная инфорамация</h2>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.person}>
                                <div className={classes.name}>
                                    <div className={classes.title}>
                                        <h4 className={classes.item}>
                                            Имя *
                                        </h4>
                                    </div>
                                    <div className={classes.field}>
                                        <input
                                        onChange={(e) => setContact({...contact, name: e.target.value})}
                                        placeholder='Введите ваше имя'
                                        type="text"  />
                                    </div>
                                </div>
                                <div className={classes.surname}>
                                    <div className={classes.title}>
                                        <h4 className={classes.item}>
                                            Фамилия *
                                        </h4>
                                    </div>
                                    <div className={classes.field}>
                                        <input
                                        onChange={(e) => setContact({...contact, surname: e.target.value})}
                                        placeholder='Введите вашу фамилию'
                                        type="text"  />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.info}>
                                    <div className={classes.phone}>
                                        <div className={classes.title}>
                                            <h4 className={classes.item}>
                                                Телефон *
                                            </h4>
                                        </div>
                                        <div className={classes.field}>
                                            <input
                                            onChange={(e) => setContact({...contact, phone: e.target.value})}
                                            placeholder='Введите номер телефона'
                                            type="text"/>
                                        </div>
                                    </div>
                                    <div className={classes.email}>
                                        <div className={classes.title}>
                                            <h4 className={classes.item}>
                                                Email *
                                            </h4>
                                        </div>
                                        <div className={classes.field}>
                                            <input
                                            onChange={(e) => setContact({...contact, email: e.target.value})}
                                            placeholder='Введите ваш email'
                                            type="text"  />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null
            }
            {
                data?.length  ? (
                <div className={classes.delivery}>
                    <div className={classes.container}>
                        <div className={classes.title} >
                            <h2 className={classes.item}>Доставка</h2>
                        </div>
                        <div className={classes.deliveryInfo}>
                            <div className={classes.container}>
                                <div
                                onClick={() => setDelivery(true)}
                                className={classes.courier}>
                                    <div className={classes.info}>
                                        <div
                                        style={delivery ? {background: '#FB6D41'} : {background: 'transparent'}}
                                        className={classes.circle}></div>
                                        <div className={classes.text}>
                                            <p className={classes.type}>Курьерская доставка</p>
                                            <p className={classes.info} > Доставка в течении 2-4 часа </p>
                                        </div>
                                    </div>
                                    <div className={classes.price}>500 ₽</div>
                                </div>
                                <div
                                onClick={() => setDelivery(false)}
                                className={classes.pickup}>
                                    <div className={classes.info}>
                                        <div
                                        style={!delivery ? {background: '#FB6D41'} : {background: 'transparent'}}
                                        className={classes.circle}></div>
                                        <div className={classes.text}>
                                            <p className={classes.type}> Самовывоз </p>
                                            <p className={classes.info} > Забрать из магазина </p>
                                        </div>
                                    </div>
                                    <div className={classes.price}>Бесплатно</div>
                                </div>
                            </div>
                        </div>
                        { delivery ? (
                        <div className={classes.address}>
                            <div className={classes.container}>
                                <div className={classes.fieldContainer}>
                                    <div className={classes.field}>
                                        <div className={classes.title}>
                                            <h4 className={classes.item}>Адрес доставки *</h4>
                                        </div>
                                        <input 
                                        onChange={(e) => setAddress({...address, item: e.target.value})}
                                        placeholder='Улица, дом, квартира'
                                        type="text" 
                                        />
                                    </div>
                                    <div className={classes.comment}>
                                        <div className={classes.title}>
                                            <h4 className={classes.item}>Комментарий к заказу</h4>
                                        </div>
                                        <input
                                        placeholder='Пожелания к заказу'
                                        type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <div className={classes.shops}>
                                <div className={classes.continer}>
                                    <div className={classes.title}>
                                        <h4 className={classes.item}>
                                            Выберите магазин из которого планируете заказывать
                                        </h4>
                                    </div>
                                    <div className={classes.shopList}>
                                        <div
                                        style={shop === 'Петра Мерлина улица, 51в к1' ? {border: '1px solid #FB6D41'} : {border: '1px solid #000'}}
                                        onClick={() => { setShop('Петра Мерлина улица, 51в к1')}} 
                                        className={classes.item}>
                                            Петра Мерлина улица, 51в к1
                                        </div>
                                        {/* <div 
                                        style={shop === 'Владимира Ленина улица, 260 к1' ? {border: '1px solid #FB6D41'} : {border: '1px solid #000'}}
                                        onClick={() => setShop('Владимира Ленина улица, 260 к1')}
                                        className={classes.item}>
                                            Владимира Ленина улица, 260 к1
                                        </div>
                                        <div 
                                        style={shop === 'Краснооктябрьская улица, 93 к1' ? {border: '1px solid #FB6D41'} : {border: '1px solid #000'}}
                                        onClick={() => setShop('Краснооктябрьская улица, 93 к1')}
                                        className={classes.item}>
                                            Краснооктябрьская улица, 93 к1
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                    <div className={classes.payWays}>
                        <div className={classes.container}>
                            <div className={classes.title}>
                                <h2 className={classes.item}>Способ оплаты</h2>
                            </div>
                            <div className={classes.item}>
                                <div
                                onClick={() => setPayOnline(true)}
                                className={classes.card}>
                                    <div 
                                    style={payOnline ? {background: '#FB6D41'} : {background: 'transparent'}}
                                    className={classes.circle}></div>
                                    <div className={classes.iconContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                                        <g clipPath="url(#clip0_44_2447)">
                                            <path d="M2.5 1.25C1.12109 1.25 0 2.37109 0 3.75V5H22.5V3.75C22.5 2.37109 21.3789 1.25 20 1.25H2.5ZM22.5 8.75H0V16.25C0 17.6289 1.12109 18.75 2.5 18.75H20C21.3789 18.75 22.5 17.6289 22.5 16.25V8.75ZM4.375 13.75H6.875C7.21875 13.75 7.5 14.0312 7.5 14.375C7.5 14.7188 7.21875 15 6.875 15H4.375C4.03125 15 3.75 14.7188 3.75 14.375C3.75 14.0312 4.03125 13.75 4.375 13.75ZM8.75 14.375C8.75 14.0312 9.03125 13.75 9.375 13.75H14.375C14.7188 13.75 15 14.0312 15 14.375C15 14.7188 14.7188 15 14.375 15H9.375C9.03125 15 8.75 14.7188 8.75 14.375Z" fill="#4B5563"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_44_2447">
                                            <path d="M0 0H22.5V20H0V0Z" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>
                                    </div>
                                    <div className={classes.text}>Онлайн</div>
                                </div>
                                <div
                                onClick={() => setPayOnline(false)}
                                className={classes.cash}>
                                    <div
                                    style={!payOnline ? {background: '#FB6D41'} : {background: 'transparent'}}
                                    className={classes.circle}></div>
                                    <div className={classes.iconContainer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                                        <g clipPath="url(#clip0_44_2453)">
                                            <path d="M2.5 2.5C1.12109 2.5 0 3.62109 0 5V15C0 16.3789 1.12109 17.5 2.5 17.5H20C21.3789 17.5 22.5 16.3789 22.5 15V5C22.5 3.62109 21.3789 2.5 20 2.5H2.5ZM5 15H2.5V12.5C3.87891 12.5 5 13.6211 5 15ZM2.5 7.5V5H5C5 6.37891 3.87891 7.5 2.5 7.5ZM17.5 15C17.5 13.6211 18.6211 12.5 20 12.5V15H17.5ZM20 7.5C18.6211 7.5 17.5 6.37891 17.5 5H20V7.5ZM11.25 6.25C12.2446 6.25 13.1984 6.64509 13.9017 7.34835C14.6049 8.05161 15 9.00544 15 10C15 10.9946 14.6049 11.9484 13.9017 12.6517C13.1984 13.3549 12.2446 13.75 11.25 13.75C10.2554 13.75 9.30161 13.3549 8.59835 12.6517C7.89509 11.9484 7.5 10.9946 7.5 10C7.5 9.00544 7.89509 8.05161 8.59835 7.34835C9.30161 6.64509 10.2554 6.25 11.25 6.25Z" fill="#4B5563"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_44_2453">
                                            <path d="M0 0H22.5V20H0V0Z" fill="white"/>
                                            </clipPath>
                                        </defs>
                                        </svg>
                                    </div>
                                    <div className={classes.text}>При получении</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ) : null
            }
        </div>

    )
}

export default Basket