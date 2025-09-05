import React from 'react'
import classes from "./style.module.scss"
const About = () => {
  return (
        <div className={classes.wrapper}>
          <section className={classes.cover}>
            <h1 className={classes.title}></h1>
            <p className={classes.subTitle}></p>
          </section>
          <section className={classes.history}>
            <div className={classes.container}>
                <div className={classes.img}></div>
                <div className={classes.text}>
                    <h3 className={classes.title}></h3>
                    <p className={classes.subTitleFirst}></p>
                    <p className={classes.subTitleSecond}></p>
                    <div className={classes.info}>
                        <p className={classes.experience}></p>
                        <p className={classes.clients}></p>
                    </div>
                </div>
            </div>
          </section>
          <section className={classes.values}>
            <h3 className={classes.title}></h3>
            <div className={classes.cards}>
                <div className={classes.cardFirst}>
                    <img src="" alt="" />
                    <h5 className={classes.title}></h5>
                    <p className={classes.subTitle}></p>
                </div>
                <div className={classes.cardSecond}>
                    <img src="" alt="" />
                    <h5 className={classes.title}></h5>
                    <p className={classes.subTitle}></p>
                </div>
                <div className={classes.cardThird}>
                    <img src="" alt="" />
                    <h5 className={classes.title}></h5>
                    <p className={classes.subTitle}></p>
                </div>
            </div>
          </section>
          <section className={classes.achievements}>
                <h4 className={classes.title}></h4>
                <div className={classes.info}>
                    <div className={classes.experience}>
                        <h5 className={classes.number}></h5>
                        <p className={classes.subTitle}></p>
                    </div>
                    <div className={classes.clients}>
                        <h5 className={classes.number}></h5>
                        <p className={classes.subTitle}></p>
                    </div>
                    <div className={classes.species}>
                        <h5 className={classes.number}></h5>
                        <p className={classes.subTitle}></p>
                    </div>
                </div>
          </section>
          <section className={classes.Ready}>
                <h2 className={classes.title}></h2>
                <p className={classes.subTitle}></p>
                <div className={classes.buttons}>
                    <button className={classes.call}>
                        <img src="" alt="" />
                        <p className={classes.text}>Позвони нам</p>
                    </button>
                    <button className={classes.write}>
                        <img src="" alt="" />
                        <p className={classes.text}>Напиши нам</p>
                    </button>
                </div>
          </section>
        </div>
    )
}

export default About