import React from 'react'
import classes from './sytle.module.scss'
import { NavLink } from 'react-router'
import cover from '../../assets/images/mainCover.png'
const Main = () => {
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
                        <h2 className={classes.title}></h2>
                        <p className={classes.subTitle}></p>
                    </div>
                    <nav className={classes.container}>
                        <div className={classes.boquets}>
                            <NavLink to="/catalog/boquets" >
                                <h4>Букеты</h4>
                                <p></p>
                            </NavLink>
                        </div>
                        <div className={classes.flowers}>
                            <NavLink to="/catalog/flowrs" >
                                <h4>Цветы</h4>
                                <p></p>
                            </NavLink>
                        </div>
                        <div className={classes.composition}>
                            <NavLink to="/catalog/composition" >
                                <h4>Композиции</h4>
                                <p></p>
                            </NavLink>
                        </div>
                        <div className={classes.toys}>
                            <NavLink to="/catalog/toys" >
                                <h4>Игрушки</h4>
                                <p></p>
                            </NavLink>
                        </div>
                        <div className={classes.balloons}>
                            <NavLink to="/catalog/balloons">
                                <h4>Шары</h4>
                                <p></p>
                            </NavLink>
                        </div>
                    </nav>
                </section>
                <section className={classes.category}>
                    <div className={classes.text}>
                        <h2 className={classes.title}></h2>
                        <p className={classes.subTitle}></p>
                    </div>
                    <nav className={classes.container}>
                        <NavLink to="/category/romantic" className={classes.romantic}>
                            <div className={classes.categoryFirst}></div>
                            <h4></h4>
                            <p></p>
                        </NavLink>
                        <NavLink to="/category/spring" className={classes.spring}>
                            <div className={classes.categorySecond}></div>
                            <h4></h4>
                            <p></p>
                        </NavLink>
                        <NavLink to="/category/wedding" className={classes.wedding}>
                            <div className={classes.categoryThird}></div>
                            <h4></h4>
                            <p></p>
                        </NavLink>
                        <NavLink to="/category/gift" className={classes.gift}>
                            <div className={classes.categoryFourth}></div>
                            <h4></h4>
                            <p></p>
                        </NavLink>
                    </nav>
                </section>
                <section className={classes.popular}>
                    <div className={classes.text}>
                        <h2 className={classes.title}></h2>
                        <div className={classes.container}>
                            <div className={classes.delivery} >
                                <img src="" alt="" />
                                <h4 className={classes.title}></h4>
                                <p className={classes.subTitle}></p>
                            </div>
                            <div className={classes.fresh} >
                                <img src="" alt="" />
                                <h4 className={classes.title}></h4>
                                <p className={classes.subTitle}></p>
                            </div>
                            <div className={classes.love} >
                                <img src="" alt="" />
                                <h4 className={classes.title}></h4>
                                <p className={classes.subTitle}></p>
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default Main