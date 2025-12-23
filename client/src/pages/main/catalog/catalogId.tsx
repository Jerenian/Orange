import { useEffect, useState } from 'react'
import classes from './style.module.scss'
import { useGetByTypeProductQuery } from '../../../services/product'
import Product from '../../../components/product/product'
import type { IProduct } from '../../../types'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { changeProductModal, getTypeId, changeEditProduct } from '../../../features/modalSlice/modalSlice'
import { useRemoveProductMutation } from '../../../services/remove'
import { changePaymentModal } from '../../../features/modalSlice/modalSlice'
import { NavLink } from 'react-router'
import cover from '../../../assets/images/mainCover.png'
import { useFilterMutation, useSortMutation} from '../../../services/filterSort'
import { Oval } from 'react-loader-spinner'
import { useGetFlowersQuery } from '../../../services/product'
const CatalogId = () => {
    const user = useSelector((state:any) => state.user)
    let param = useParams()
    const dataTypes = useSelector((state: any) => state.type.types)
    const typeName = dataTypes?.find((item: any) => item.id === param.id)?.name
    const [remove] = useRemoveProductMutation()
    const dispatch = useDispatch() 
    const { data, error, isLoading } = useGetByTypeProductQuery(param.id as string)
    const [dataProducts, setDataProducts] = useState<any>()
    const [filter, filterLoad = {isLoading}] = useFilterMutation() 
    const [sort, sortLoad = {isLoading}] = useSortMutation()
    const [filterValue, setFilterValue] = useState<any>({name: [], min: 0, max:0})
    const [sortValue, setSortValue] = useState('')
    const [filterModal, setFilterModal] = useState(false)
    const [sortModal, setSortModal] = useState(false)
    const [chosenSort, setChosenSort] = useState({default: true, up: false, down: false})
    const filterArrayValues = useGetFlowersQuery(null)
    // useEffect(() => {
    //     setDataProducts(filter?.data)
    //     console.log(filter)
    // }, [filter])
    useEffect(() => {
        setDataProducts(data)
    }, [data])
    const prices: any = data?.map((item: any) => (
        item.price
    ))
    const uniqueArr = filterArrayValues.data
    const min = Math.min.apply(null, prices)
    const max = Math.max.apply(null, prices)

    const hendleClick = () => {
        dispatch(changeProductModal(param.id))
        dispatch(getTypeId(param.id))
    }

    const hendleRemove = async (id: string) => {
        await remove(id)
        window.location.reload()
    }
    const  hendleEdit = async (data: IProduct) => {
        dispatch(changeEditProduct({...data}))
    }
    const hendlePayment = () => {
        dispatch(changePaymentModal())
    }
    const hendleFilter = () => {
        setFilterValue({...filterValue, min: min, max: max,})
        setFilterModal(!filterModal)
        setSortModal(false)
    }
    const hendleSort = () => {
        setSortModal(!sortModal)
        setFilterModal(false)
    }
    const hendleCheck = (item: string) => {
        
        if(filterValue.name.includes(item)){
            let num = filterValue.name.indexOf(item)
            filterValue.name.splice(num, 1)
         } else {
             filterValue.name.push(item)
         }
    }
    const hendleChoose = (value: string) => {
        setSortValue(value)
        if(value === ''){
            setChosenSort({...chosenSort, default: true, up: false, down: false})
        } else if (value === 'up') {
            setChosenSort({...chosenSort, default: false, up: true, down: false})
        } else if (value === 'down') {
            setChosenSort({...chosenSort, default: false, up: false, down: true})
        }
        
    }
    const saveFilter = async () => {
        let request = {
            name: filterValue.name,
            price: {
                min: filterValue.min -0,
                max: filterValue.max -0
            },
            category: typeName
        }

        const body = await filter(request)
        setDataProducts(body.data)
        setFilterModal(false)
    }
    const saveSort = async() => {
        let request = {
            param: sortValue,
            data: dataProducts
        }
        const body = await sort(request)
        setDataProducts(body?.data)
        setSortModal(false)
        
        
    }
    return (
        <div onClick={() => {setSortModal(false); setFilterModal(false)}} className={classes.wrapper}>
            {error ? (               
            <div className={classes.nothing}>
                <div className={classes.nothingItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                        <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                    </svg>
                </div>
                <p>Произошла ошибка</p>
            </div>
            ) : isLoading ? (
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
            ) : data ? (
            <div>
            <div className={classes.cover}>
                <div className={classes.text}>
                    <h1 className={classes.title}>Свежие цветы <br /> каждый день</h1>
                    <p className={classes.subTitle}>Создаем букеты с душой для особых моментов вашей <br /> жизни</p>
                    <div className={classes.button}>
                        <button onClick={() => hendlePayment()} className={classes.btnFirst} >Заказть букет</button>
                        <NavLink className={classes.btnSecond} to="/catalog">
                            <button>
                                Весь каталог
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className={classes.img}>
                    <img decoding="async" loading="lazy" src={cover} alt="" />
                </div>
            </div>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>Товары категории {typeName}</h2>
                <div onClick={(e) => {e.stopPropagation(); hendleFilter()}} className={classes.filterContainer}>
                    <button className={classes.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#424141"><path d="M456.18-192Q446-192 439-198.9t-7-17.1v-227L197-729q-9-12-2.74-25.5Q200.51-768 216-768h528q15.49 0 21.74 13.5Q772-741 763-729L528-443v227q0 10.2-6.88 17.1-6.89 6.9-17.06 6.9h-47.88ZM480-498l162-198H317l163 198Zm0 0Z"/></svg>
                        <p className={classes.filterText}>Фильтровать</p>
                    </button>
                    <div onClick={(e) => e.stopPropagation()} className={filterModal ? classes.openModal : classes.modal}>
                        <div className={classes.filterItem}>
                            <div className={classes.price}>
                                <div>
                                    <span>Цена от</span>
                                    <input
                                    className={classes.field}
                                    value={filterValue.min}
                                    onChange={(e) => setFilterValue({...filterValue, min: e.target.value})}
                                    type="text" />
                                </div>
                                <div>
                                    <span>Цена до</span>
                                    <input
                                    className={classes.field}
                                    value={filterValue.max}
                                    onChange={(e) => setFilterValue({...filterValue, max: e.target.value})}
                                    type="text" />
                                </div>
                            </div>
                            <div className={classes.itemsList}>
                                <div>
                                    {typeName?.toUpperCase() == 'ЦВЕТЫ' || typeName?.toUpperCase() == 'БУКЕТЫ' ? uniqueArr?.map((item: any) => (
                                        <div>
                                            <input onChange={() => hendleCheck(item.name)} id={item.name} type="checkbox" />
                                            <label htmlFor={item.name}>{item.name}</label>
                                        </div>
                                    )) : null}
                                </div>
                            </div>
                        </div>
                        <div className={classes.saveContainer}>
                            <button onClick={() => saveFilter()} >Сохранить</button>
                        </div>
                    </div>
                </div>
                <div onClick={(e) => {hendleSort(), e.stopPropagation()}} className={classes.sortContainer}>
                    <button className={classes.sort}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#424141"><path d="M120-240v-66.67h240V-240H120Zm0-206.67v-66.66h480v66.66H120Zm0-206.66V-720h720v66.67H120Z"/></svg>
                        <p className={classes.sortText}>Сортировать</p>
                    </button>
                    <div onClick={(e) => e.stopPropagation()} className={sortModal ? classes.openModal : classes.modal }>
                        <div className={classes.chooseSort}>
                            <div className={chosenSort.default ? classes.chosenItem : classes.sortItem} onClick={() => hendleChoose('')}>По умолчанию</div>
                            <div className={chosenSort.up ? classes.chosenItem : classes.sortItem} onClick={() => hendleChoose('up')}>Цена по убыванию</div>
                            <div className={chosenSort.down ? classes.chosenItem : classes.sortItem} onClick={() => hendleChoose('down')}>Цена по возрастанию</div>
                        </div>
                        <div className={classes.saveContainer}>
                            <button onClick={() => saveSort()} >Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.container}>
            {
                filterLoad.isLoading || sortLoad.isLoading ? (
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
                    ) :
                   dataProducts?.length ? dataProducts?.map((item: IProduct) => (
                    <div key={item.id} className={classes.rowContainer}>
                    { user?.data?.role === 'admin' ? (
                                <div className={classes.row}>
                                    <button className={classes.remove} onClick={() => hendleRemove(item.id as string)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                            <path d="M7 16C7.26522 16 7.51957 15.8946 7.70711 15.7071C7.89464 15.5196 8 15.2652 8 15V9C8 8.73478 7.89464 8.48043 7.70711 8.29289C7.51957 8.10536 7.26522 8 7 8C6.73478 8 6.48043 8.10536 6.29289 8.29289C6.10536 8.48043 6 8.73478 6 9V15C6 15.2652 6.10536 15.5196 6.29289 15.7071C6.48043 15.8946 6.73478 16 7 16ZM17 4H13V3C13 2.20435 12.6839 1.44129 12.1213 0.87868C11.5587 0.316071 10.7956 0 10 0H8C7.20435 0 6.44129 0.316071 5.87868 0.87868C5.31607 1.44129 5 2.20435 5 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V17C2 17.7956 2.31607 18.5587 2.87868 19.1213C3.44129 19.6839 4.20435 20 5 20H13C13.7956 20 14.5587 19.6839 15.1213 19.1213C15.6839 18.5587 16 17.7956 16 17V6H17C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4ZM7 3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H10C10.2652 2 10.5196 2.10536 10.7071 2.29289C10.8946 2.48043 11 2.73478 11 3V4H7V3ZM14 17C14 17.2652 13.8946 17.5196 13.7071 17.7071C13.5196 17.8946 13.2652 18 13 18H5C4.73478 18 4.48043 17.8946 4.29289 17.7071C4.10536 17.5196 4 17.2652 4 17V6H14V17ZM11 16C11.2652 16 11.5196 15.8946 11.7071 15.7071C11.8946 15.5196 12 15.2652 12 15V9C12 8.73478 11.8946 8.48043 11.7071 8.29289C11.5196 8.10536 11.2652 8 11 8C10.7348 8 10.4804 8.10536 10.2929 8.29289C10.1054 8.48043 10 8.73478 10 9V15C10 15.2652 10.1054 15.5196 10.2929 15.7071C10.4804 15.8946 10.7348 16 11 16Z" fill="black"/>
                                        </svg>
                                    </button>
                                    <button onClick={() => hendleEdit(item)} className={classes.update}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M3 16.0012H7.24C7.37161 16.0019 7.50207 15.9767 7.62391 15.927C7.74574 15.8772 7.85656 15.8039 7.95 15.7112L14.87 8.78325L17.71 6.00406C17.8037 5.91112 17.8781 5.80055 17.9289 5.67873C17.9797 5.55691 18.0058 5.42624 18.0058 5.29426C18.0058 5.16229 17.9797 5.03162 17.9289 4.9098C17.8781 4.78797 17.8037 4.67741 17.71 4.58447L13.47 0.295713C13.377 0.202011 13.2664 0.127639 13.1446 0.0768846C13.0227 0.0261307 12.892 0 12.76 0C12.628 0 12.4973 0.0261307 12.3754 0.0768846C12.2536 0.127639 12.143 0.202011 12.05 0.295713L9.23 3.12489L2.29 10.0529C2.19732 10.1463 2.12399 10.2571 2.07423 10.3789C2.02446 10.5007 1.99924 10.6311 2 10.7627V15.0014C2 15.2666 2.10536 15.5209 2.29289 15.7084C2.48043 15.8958 2.73478 16.0012 3 16.0012ZM12.76 2.4151L15.59 5.24428L14.17 6.66387L11.34 3.83469L12.76 2.4151ZM4 11.1726L9.93 5.24428L12.76 8.07346L6.83 14.0017H4V11.1726ZM19 18.0006H1C0.734784 18.0006 0.48043 18.1059 0.292893 18.2934C0.105357 18.4809 0 18.7352 0 19.0003C0 19.2654 0.105357 19.5197 0.292893 19.7072C0.48043 19.8947 0.734784 20 1 20H19C19.2652 20 19.5196 19.8947 19.7071 19.7072C19.8946 19.5197 20 19.2654 20 19.0003C20 18.7352 19.8946 18.4809 19.7071 18.2934C19.5196 18.1059 19.2652 18.0006 19 18.0006Z" fill="black"/>
                                        </svg>
                                    </button> 
                                    <Product data = {item} />
                                </div>
                        ) :
                            <div className={classes.row}>
                                <Product data = {item} />
                            </div>
                    }
                    </div>
                )) 
                : (
                    <div>
                        <div className={classes.nothing}>
                                <div className={classes.nothingItem}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                                        <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                                    </svg>
                                </div>
                                <p>Ничего не найдено </p>
                            </div>
                    </div>
                )
                }

                {
                    user?.data?.role === 'admin' ? (
                    <div onClick={() => hendleClick()}  className={classes.createType}>
                        <svg viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fb9a8d" stroke="#fb9a8d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M220.5 245.4c-32.8 32.8-55.1 73.2-65.2 117.3h16.5c18.8-75.3 75.1-135.9 148-160.7v-16.9c-37.1 11.6-71 32-99.3 60.3z" fill="#fb9a8d"></path><path d="M959.9 540.8c0 113.6-92.1 205.8-205.7 205.9H590.9v-44h163.3c43.2 0 83.8-16.9 114.3-47.4 30.6-30.6 47.4-71.2 47.4-114.5 0-43.2-16.8-83.9-47.4-114.4S797.2 379 754 379c-11.5 0-22.8 1.2-33.8 3.5-15 3.2-29.4 8.4-42.8 15.7-1-15.4-3.3-30.7-6.8-45.6v-0.1c-3.6-15.6-8.6-30.8-14.9-45.7-14.4-33.9-34.9-64.4-61.1-90.6-26.2-26.2-56.6-46.7-90.6-61.1-35.1-14.8-72.4-22.4-110.9-22.4s-75.8 7.5-110.9 22.4c-33.9 14.3-64.4 34.9-90.6 61.1-26.2 26.2-46.7 56.7-61.1 90.6-14.9 35.1-22.4 72.4-22.4 110.9s7.5 75.8 22.4 110.9c14.3 33.9 34.9 64.4 61.1 90.6 26.2 26.2 56.7 46.7 90.6 61.1 35.1 14.8 72.4 22.4 110.9 22.4h39.7v44h-41C210.7 746 64.1 599 64.1 417.7c0-181.7 147.3-329 329-329 154.6 0 284.3 106.6 319.5 250.3v0.1c13.4-2.7 27.2-4.2 41.4-4.2 113.7 0.1 205.9 92.2 205.9 205.9z" fill="#fb9a8d"></path><path d="M692.9 636.1h-22.6L519.8 485.6v449.6h-16V485.8L353.4 636.1h-22.6l181-181z" fill="#fb9a8d"></path></g></svg>
                        <p>
                            добавить <br /> товар
                        </p>
                    </div>
                    ) : null
                }

                </div>
             </div>   ) : null}
        </div>
    )
}

export default CatalogId