import { useEffect, useState } from 'react'
import classes from './style.module.scss'
import { useGetFlowersQuery } from '../../../services/product'
import Product from '../../../components/product/product'
import type { IProduct } from '../../../types'
import cover from '../../../assets/images/mainCover.png'
import { useDispatch, useSelector } from 'react-redux'
import { changePaymentModal } from '../../../features/modalSlice/modalSlice'
import { useFilterMutation, useSortMutation } from '../../../services/filterSort'
import { Oval } from 'react-loader-spinner'
const Catalog = () => {
    const dispatch = useDispatch()
    const dataTypes = useSelector(state => state.type.types)
    const data  = useSelector(state => state.product.data)
    const [dataProducts, setDataProducts] = useState()
    const [filter, filterLoad = {isLoading}] = useFilterMutation() 
    const [sort, sortLoad = {isLoading}] = useSortMutation()
    const [filterValue, setFilterValue] = useState({name: [], min: 0, max:0})
    const [sortValue, setSortValue] = useState('')
    const [filterModal, setFilterModal] = useState(false)
    const [sortModal, setSortModal] = useState(false)
    const [chosenSort, setChosenSort] = useState({default: true, up: false, down: false})
    const [typeId, setTypeId] = useState('')
    const [typeName, setTypeName] = useState('')
    const filterArrayValues = useGetFlowersQuery(null)
    const [filterData, setFilterData] = useState()
    useEffect(() => {
        setDataProducts(filter?.data)
    }, [filter])
    useEffect(() => {
        setDataProducts(data)
    }, [data])
    
    const prices = data?.map(item => (
        item.price
    ))
    const min = Math.min.apply(null, prices)
    const max = Math.max.apply(null, prices)
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
    const hendleCheck = (item: string, e) => {
        
        if(filterValue.name.includes(item)){
            let num = filterValue.name.indexOf(item)
            filterValue.name.splice(num, 1)
            e.target.style = 'background-color: transparent'
         } else {
             filterValue.name.push(item)
             e.target.style = 'background-color: #fff;'
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
    const hendleSetTypes = (id: string, name: string, e) => {
        setTypeId(id)
        setTypeName(name)
        if(name.toUpperCase() == "ЦВЕТЫ" || name.toUpperCase() == "БУКЕТЫ") {
           setFilterData(filterArrayValues?.data.map(item => item.name))
        }
    }
    const saveFilter = async () => {
        let request = {
            name: filterValue.name,
            price: {
                min: filterValue.min -0,
                max: filterValue.max -0
            },
            typeId: typeId,
            category: typeName
        }
        const body = await filter(request)
        setDataProducts(body?.data)
        setFilterModal(false)
    }
    const saveSort = async() => {
        let request = {
            param: sortValue,
            data: dataProducts,
        }
        const body = await sort(request)
        setDataProducts(body?.data)
        setSortModal(false)
    }
    return (
        <div onClick={() => {setSortModal(false); setFilterModal(false)}} className={classes.wrapper}>
        {!data.length ? (               
            <div className={classes.nothing}>
                <div className={classes.nothingItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="142" viewBox="0 0 150 142" fill="none">
                        <path d="M55.557 95.312C54.2175 96.3954 53.3756 97.9437 53.2139 99.6211C53.0521 101.298 53.5836 102.97 54.6931 104.272C55.2509 104.92 55.9361 105.456 56.7093 105.848C57.4825 106.241 58.3285 106.483 59.1989 106.56C60.0694 106.638 60.9471 106.549 61.7818 106.299C62.6165 106.049 63.3918 105.643 64.0633 105.104C68.5058 101.655 74.0403 99.7735 79.7468 99.7735C85.4534 99.7735 90.9879 101.655 95.4304 105.104C96.1019 105.643 96.8772 106.049 97.7119 106.299C98.5466 106.549 99.4243 106.638 100.295 106.56C101.165 106.483 102.011 106.241 102.784 105.848C103.558 105.456 104.243 104.92 104.801 104.272C105.91 102.97 106.442 101.298 106.28 99.6211C106.118 97.9437 105.276 96.3954 103.937 95.312C97.0793 90.0036 88.545 87.1098 79.7468 87.1098C70.9487 87.1098 62.4144 90.0036 55.557 95.312ZM59.8101 67.6C61.1245 67.6 62.4094 67.2246 63.5022 66.5214C64.5951 65.8181 65.4469 64.8186 65.9498 63.6492C66.4528 62.4797 66.5844 61.1929 66.328 59.9514C66.0716 58.7099 65.4387 57.5696 64.5093 56.6745C63.5799 55.7795 62.3957 55.1699 61.1066 54.923C59.8175 54.676 58.4813 54.8028 57.267 55.2872C56.0527 55.7716 55.0148 56.5919 54.2846 57.6443C53.5543 58.6968 53.1646 59.9342 53.1646 61.2C53.1646 62.8974 53.8647 64.5252 55.111 65.7255C56.3573 66.9257 58.0476 67.6 59.8101 67.6ZM79.7468 10C66.6032 10 53.7546 13.7535 42.826 20.7859C31.8975 27.8184 23.3797 37.8138 18.3498 49.5082C13.3199 61.2027 12.0039 74.071 14.5681 86.4858C17.1323 98.9005 23.4616 110.304 32.7556 119.255C42.0496 128.205 53.8909 134.301 66.782 136.77C79.6731 139.24 93.0352 137.972 105.178 133.128C117.322 128.284 127.7 120.081 135.003 109.556C142.305 99.0317 146.203 86.658 146.203 74C146.203 65.5954 144.484 57.2731 141.144 49.5082C137.804 41.7434 132.909 34.6881 126.738 28.7452C120.567 22.8022 113.241 18.088 105.178 14.8717C97.1156 11.6554 88.4739 10 79.7468 10ZM79.7468 125.2C69.2319 125.2 58.9531 122.197 50.2102 116.571C41.4673 110.945 34.6531 102.949 30.6292 93.5934C26.6053 84.2378 25.5525 73.9432 27.6038 64.0114C29.6552 54.0795 34.7186 44.9566 42.1538 37.7961C49.589 30.6357 59.0621 25.7594 69.375 23.7838C79.6879 21.8082 90.3775 22.8222 100.092 26.6974C109.807 30.5726 118.11 37.135 123.952 45.5548C129.793 53.9746 132.911 63.8736 132.911 74C132.911 87.5791 127.31 100.602 117.34 110.204C107.37 119.806 93.847 125.2 79.7468 125.2ZM99.6836 54.8C98.3692 54.8 97.0843 55.1753 95.9915 55.8786C94.8986 56.5818 94.0468 57.5814 93.5438 58.7508C93.0409 59.9203 92.9093 61.2071 93.1657 62.4486C93.4221 63.69 94.055 64.8304 94.9844 65.7255C95.9138 66.6205 97.098 67.2301 98.3871 67.477C99.6762 67.724 101.012 67.5972 102.227 67.1128C103.441 66.6284 104.479 65.8081 105.209 64.7556C105.939 63.7032 106.329 62.4658 106.329 61.2C106.329 59.5026 105.629 57.8747 104.383 56.6745C103.136 55.4743 101.446 54.8 99.6836 54.8Z" fill="#FB6D41"/>
                    </svg>
                </div>
                <p>Произошла ошибка</p>
            </div>
        ) : (
            <div>
                <div>
                <div className={classes.cover}>
                <div className={classes.text}>
                    <h1 className={classes.title}>Свежие цветы <br /> каждый день</h1>
                    <p className={classes.subTitle}>Создаем букеты с душой для особых моментов вашей <br /> жизни</p>
                    <div className={classes.button}>
                        <button onClick={() => hendlePayment()} className={classes.btnFirst} >Заказть букет</button>
                    </div>
                </div>
                <div className={classes.img}>
                    <img decoding="async" loading="lazy" src={cover} alt="" />
                </div>
            </div>
            <div className={classes.titleContainer}>
                <h2 className={classes.title}>Список всех товаров</h2>
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
                                <div className={classes.typeDropdown}>
                                    {dataTypes?.map(item => (
                                        <div key={item.id} className={typeId  === item.id ? classes.dropdownItemActive : classes.dropdownItem} onClick={(e) => hendleSetTypes(item.id, item.name, e)}>
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                                    {
                                        filterData ? (
                                            <div className={classes.filterList}>
                                                {
                                                    filterData?.map(item => (
                                                        <div key={item.id} onClick={(e) => hendleCheck(item, e)} className={classes.items}>
                                                            {item}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : null
                                    }
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
                            <div className={chosenSort.down ? classes.chosenItem : classes.sortItem} onClick={() => hendleChoose('down')}>Цена по убыванию</div>
                            <div className={chosenSort.up ? classes.chosenItem : classes.sortItem} onClick={() => hendleChoose('up')}>Цена по возрастанию</div>
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
                                <div className={classes.row}>
                                    <Product data = {item} />
                                </div>
                            </div>
                        )) : (
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
                    </div> 
                </div>
            </div>
        )}
        </div>
    )
}

export default Catalog