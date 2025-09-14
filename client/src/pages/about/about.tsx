import React from 'react'
import classes from "./style.module.scss"
import aboutCover from '../../assets/images/aboutCover.png'
const About = () => {
  return (
        <div className={classes.wrapper}>
          <section className={classes.cover}>
            <h1 className={classes.title}>О нас</h1>
            <p className={classes.subTitle}>Мы создаем красоту и радость через цветы уже более 15 лет</p>
          </section>
          <section className={classes.history}>
            <div className={classes.container}>
                <div className={classes.img}>
                    <img src={aboutCover} alt="" />
                </div>
                <div className={classes.text}>
                    <h3 className={classes.title}>Наша история</h3>
                    <p className={classes.subTitleFirst}>Начав с небольшого семейного магазина в 2008 году, мы превратились в один из ведущих цветочных рынков города. Наша страсть к цветам и желание дарить радость людям остаются неизменными.</p>
                    <p className={classes.subTitleSecond}>Каждый день мы работаем с лучшими поставщиками, чтобы предложить вам самые свежие и красивые цветы. Наша команда профессионалов готова помочь создать идеальную композицию для любого случая.</p>
                    <div className={classes.info}>
                        <p className={classes.experience}>15+ лет опыта</p>
                        <p className={classes.clients}>1000+ клиентов</p>
                    </div>
                </div>
            </div>
          </section>
          <section className={classes.values}>
            <h3 className={classes.title}>Наши ценности</h3>
            <div className={classes.cards}>
                <div className={classes.cardFirst}>
                    <div className={classes.yellow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24" fill="none">
                        <g clip-path="url(#clip0_18_840)">
                            <path d="M15.6828 0.84375C15.4344 0.328125 14.9094 0 14.3328 0C13.7562 0 13.2359 0.328125 12.9828 0.84375L9.96873 7.04531L3.23748 8.03906C2.67498 8.12344 2.20623 8.51719 2.0328 9.05625C1.85936 9.59531 1.99998 10.1906 2.40311 10.5891L7.28749 15.4219L6.13436 22.2516C6.04061 22.8141 6.27498 23.3859 6.73905 23.7188C7.20311 24.0516 7.81717 24.0938 8.32342 23.8266L14.3375 20.6156L20.3515 23.8266C20.8578 24.0938 21.4719 24.0562 21.9359 23.7188C22.4 23.3813 22.6344 22.8141 22.5406 22.2516L21.3828 15.4219L26.2672 10.5891C26.6703 10.1906 26.8156 9.59531 26.6375 9.05625C26.4594 8.51719 25.9953 8.12344 25.4328 8.03906L18.6969 7.04531L15.6828 0.84375Z" fill="black"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_18_840">
                            <path d="M0.828125 0H27.8281V24H0.828125V0Z" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <h5 className={classes.title}>Качество</h5>
                    <p className={classes.subTitle}>
                        Мы работаем только с проверенными поставщиками и гарантируем свежесть каждого цветка.
                    </p>
                </div>
                <div className={classes.cardSecond}>
                    <div className={classes.orange}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <g clip-path="url(#clip0_18_852)">
                            <path d="M3.21562 14.0813L11.6859 21.9891C12.0375 22.3172 12.5016 22.5 12.9844 22.5C13.4672 22.5 13.9313 22.3172 14.2828 21.9891L22.7531 14.0813C24.1781 12.7547 24.9844 10.8938 24.9844 8.94844V8.67657C24.9844 5.40001 22.6172 2.60626 19.3875 2.06719C17.25 1.71094 15.075 2.40938 13.5469 3.93751L12.9844 4.50001L12.4219 3.93751C10.8938 2.40938 8.71875 1.71094 6.58125 2.06719C3.35156 2.60626 0.984375 5.40001 0.984375 8.67657V8.94844C0.984375 10.8938 1.79062 12.7547 3.21562 14.0813Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_18_852">
                            <path d="M0.984375 0H24.9844V24H0.984375V0Z" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <h5 className={classes.title}>Сервис</h5>
                    <p className={classes.subTitle}>
                        Индивидуальный подход к каждому клиенту и профессиональные консультации флористов.
                    </p>
                </div>
                <div className={classes.cardThird}>
                    <div className={classes.black}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <g clip-path="url(#clip0_18_864)">
                            <path d="M24.6562 12C24.6562 12.0422 24.6562 12.0844 24.6562 12.1266C24.6375 13.8375 23.0812 15 21.3703 15H16.7812C15.5391 15 14.5312 16.0078 14.5312 17.25C14.5312 17.4094 14.55 17.5641 14.5781 17.7141C14.6766 18.1922 14.8828 18.6516 15.0844 19.1156C15.3703 19.7625 15.6516 20.4047 15.6516 21.0844C15.6516 22.575 14.6391 23.9297 13.1484 23.9906C12.9844 23.9953 12.8203 24 12.6516 24C6.02812 24 0.65625 18.6281 0.65625 12C0.65625 5.37188 6.02813 0 12.6562 0C19.2844 0 24.6562 5.37188 24.6562 12ZM6.65625 13.5C6.65625 13.1022 6.49821 12.7206 6.21691 12.4393C5.93561 12.158 5.55407 12 5.15625 12C4.75843 12 4.37689 12.158 4.09559 12.4393C3.81429 12.7206 3.65625 13.1022 3.65625 13.5C3.65625 13.8978 3.81429 14.2794 4.09559 14.5607C4.37689 14.842 4.75843 15 5.15625 15C5.55407 15 5.93561 14.842 6.21691 14.5607C6.49821 14.2794 6.65625 13.8978 6.65625 13.5ZM6.65625 9C7.05407 9 7.43561 8.84196 7.71691 8.56066C7.99821 8.27936 8.15625 7.89782 8.15625 7.5C8.15625 7.10218 7.99821 6.72064 7.71691 6.43934C7.43561 6.15804 7.05407 6 6.65625 6C6.25843 6 5.87689 6.15804 5.59559 6.43934C5.31429 6.72064 5.15625 7.10218 5.15625 7.5C5.15625 7.89782 5.31429 8.27936 5.59559 8.56066C5.87689 8.84196 6.25843 9 6.65625 9ZM14.1562 4.5C14.1562 4.10218 13.9982 3.72064 13.7169 3.43934C13.4356 3.15804 13.0541 3 12.6562 3C12.2584 3 11.8769 3.15804 11.5956 3.43934C11.3143 3.72064 11.1562 4.10218 11.1562 4.5C11.1562 4.89782 11.3143 5.27936 11.5956 5.56066C11.8769 5.84196 12.2584 6 12.6562 6C13.0541 6 13.4356 5.84196 13.7169 5.56066C13.9982 5.27936 14.1562 4.89782 14.1562 4.5ZM18.6562 9C19.0541 9 19.4356 8.84196 19.7169 8.56066C19.9982 8.27936 20.1562 7.89782 20.1562 7.5C20.1562 7.10218 19.9982 6.72064 19.7169 6.43934C19.4356 6.15804 19.0541 6 18.6562 6C18.2584 6 17.8769 6.15804 17.5956 6.43934C17.3143 6.72064 17.1562 7.10218 17.1562 7.5C17.1562 7.89782 17.3143 8.27936 17.5956 8.56066C17.8769 8.84196 18.2584 9 18.6562 9Z" fill="#E5FA39"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_18_864">
                            <path d="M0.65625 0H24.6562V24H0.65625V0Z" fill="white"/>
                            </clipPath>
                        </defs>
                        </svg>
                    </div>
                    <h5 className={classes.title}>Креативность</h5>
                    <p className={classes.subTitle}>
                        Уникальные композиции и авторские букеты для особенных моментов в вашей жизни.
                    </p>
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