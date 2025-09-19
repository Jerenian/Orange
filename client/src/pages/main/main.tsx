import React from 'react'
import classes from './sytle.module.scss'
import { NavLink } from 'react-router'
import cover from '../../assets/images/mainCover.png'
import flowers from '../../assets/images/pages/main/flowers.png'
import Romantic from '../../assets/images/pages/main/romantic.png'
import classicLove from '../../assets/images/pages/main/classicLove.png'
import { useGetAllTypesQuery } from '../../services/type'
import MainCatalog from '../../components/main-catalog/main-catalog'

const Main = () => {
    const {data, isLoading, error} = useGetAllTypesQuery(null)
    console.log(data)
    return (
        <div className={classes.wrapper}>
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
                        {data?.map((item) => (
                            <MainCatalog data={item}></MainCatalog>
                        ))}
                        {/* <div className={classes.boquets}>
                            <NavLink to="/catalog/boquets" >
                             <div className={classes.shadow} ></div>
                            <img src={flowers} alt="" />
                                <h4>Букеты</h4>
                                <p>От 100 рублей</p>
                            </NavLink>
                        </div>
                        <div className={classes.flowers}>
                            <NavLink to="/catalog/flowers" >
                            <div className={classes.shadow} ></div>
                            <img src={flowers} alt="" />
                                <h4>Цветы</h4>
                                <p>От 100 рублей</p>
                            </NavLink>
                        </div>
                        <div className={classes.composition}>
                            <NavLink to="/catalog/composition" >
                            <div className={classes.shadow} ></div>
                            <img src={flowers} alt="" />
                                <h4>Композиции</h4>
                                <p>От 100 рублей</p>
                            </NavLink>
                        </div>
                        <div className={classes.toys}>
                            <NavLink to="/catalog/toys" >
                             <div className={classes.shadow} ></div>
                            <img src={flowers} alt="" />
                                <h4>Игрушки</h4>
                                <p>От 100 рублей</p>
                            </NavLink>
                        </div>
                        <div className={classes.balloons}>
                            <NavLink to="/catalog/balloons">
                            <div className={classes.shadow} ></div>
                            <img src={flowers} alt="" />
                                <h4>Шары</h4>
                                <p>От 100 рублей</p>
                            </NavLink>
                        </div> */}
                    </nav>
                </section>
                {/* <section className={classes.category}>
                    <div className={classes.header}>
                        <h2 className={classes.title}>Наши категории</h2>
                        <p className={classes.subTitle}>Выберите идеальный букет для любого случая</p>
                    </div>
                    <nav className={classes.container}>
                        <div className={classes.categoryFirst}>
                            <NavLink to="/category/romantic" className={classes.romantic}>
                                <img src={Romantic} alt="" />
                                <div className={classes.text}>
                                    <h4>Романтические</h4>
                                    <p>Букеты для особых моментов</p>
                                    <span>от 2 500 ₽</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className={classes.categorySecond}>
                            <NavLink to="/category/spring" className={classes.spring}>
                                <img src={Romantic} alt="" />
                                <div className={classes.text}>
                                    <h4>Весенние</h4>
                                    <p>Букеты для особых моментов</p>
                                    <span>от 2 500 ₽</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className={classes.categoryThird}>
                            <NavLink to="/category/wedding" className={classes.wedding}>
                            <img src={Romantic} alt="" />
                            <div className={classes.text}>
                                    <h4>Свадебные</h4>
                                    <p>Букеты для особых моментов</p>
                                    <span>от 2 500 ₽</span>
                                </div>
                            </NavLink>
                        </div>
                        <div className={classes.categoryFourth}>
                            <NavLink to="/category/gift" className={classes.gift}>
                                <img src={Romantic} alt="" />
                                <div className={classes.text}>
                                    <h4>Подарочные</h4>
                                    <p>Букеты для особых моментов</p>
                                    <span>от 2 500 ₽</span>
                                </div>
                            </NavLink>
                        </div>
                    </nav>
                </section> */}
                <section className={classes.popular}>
                    <div className={classes.header}>
                        <h2 className={classes.title}>Популярные букеты</h2>
                        <p className={classes.subTitle}>Самые любимые композиции наших клиентов</p>
                    </div>
                        <div className={classes.container}>
                            <div className={classes.popularFirst} >
                                    <img src={classicLove} alt="" />
                                <div className={classes.text}>
                                    <h4 className={classes.title}>Классика любви</h4>
                                    <p className={classes.subTitle}>25 красных роз премиум класса</p>
                                </div>
                            </div>
                            <div className={classes.popularSecond} >
                                    <img src={classicLove} alt="" />
                                <div className={classes.text}>
                                    <h4 className={classes.title}>Весенний микс</h4>
                                    <p className={classes.subTitle}>Тюльпаны, фрезии и зелень</p>
                                </div>
                            </div>
                            <div className={classes.popularThird} >
                                    <img src={classicLove} alt="" />
                                <div className={classes.text}>
                                    <h4 className={classes.title}>Нежность</h4>
                                    <p className={classes.subTitle}>Белые и розовые пионы</p>
                                </div>
                            </div>
                        </div>
                </section>
        </div>
    )
}

export default Main