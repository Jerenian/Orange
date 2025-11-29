import React from 'react'
import classes from './style.module.scss'
import { useDispatch } from 'react-redux'
import { changePaymentModal } from '../../features/modalSlice/modalSlice'
const Delivery = () => {
    const dispatch = useDispatch()
    const hendlePayment = () => {
        dispatch(changePaymentModal())
    }
  return (
        <div className={classes.wrapper}>
        <div className={classes.cover}>
              <h2 className={classes.title}>Доставка цветов</h2>
              <p className={classes.subTitle}>Быстрая и бережная доставка свежих цветов по всему городу. Мы гарантируем качество и своевременность каждого заказа.</p>
              <div className={classes.info}>
                <div className={classes.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                        <path d="M1.875 0.5C0.839844 0.5 0 1.33984 0 2.375V14.875C0 15.9102 0.839844 16.75 1.875 16.75H2.5C2.5 18.8203 4.17969 20.5 6.25 20.5C8.32031 20.5 10 18.8203 10 16.75H15C15 18.8203 16.6797 20.5 18.75 20.5C20.8203 20.5 22.5 18.8203 22.5 16.75H23.75C24.4414 16.75 25 16.1914 25 15.5C25 14.8086 24.4414 14.25 23.75 14.25V11.75V10.5V9.76953C23.75 9.10547 23.4883 8.46875 23.0195 8L20 4.98047C19.5312 4.51172 18.8945 4.25 18.2305 4.25H16.25V2.375C16.25 1.33984 15.4102 0.5 14.375 0.5H1.875ZM16.25 6.75H18.2305L21.25 9.76953V10.5H16.25V6.75ZM4.375 16.75C4.375 16.2527 4.57254 15.7758 4.92417 15.4242C5.27581 15.0725 5.75272 14.875 6.25 14.875C6.74728 14.875 7.22419 15.0725 7.57583 15.4242C7.92746 15.7758 8.125 16.2527 8.125 16.75C8.125 17.2473 7.92746 17.7242 7.57583 18.0758C7.22419 18.4275 6.74728 18.625 6.25 18.625C5.75272 18.625 5.27581 18.4275 4.92417 18.0758C4.57254 17.7242 4.375 17.2473 4.375 16.75ZM18.75 14.875C19.2473 14.875 19.7242 15.0725 20.0758 15.4242C20.4275 15.7758 20.625 16.2527 20.625 16.75C20.625 17.2473 20.4275 17.7242 20.0758 18.0758C19.7242 18.4275 19.2473 18.625 18.75 18.625C18.2527 18.625 17.7758 18.4275 17.4242 18.0758C17.0725 17.7242 16.875 17.2473 16.875 16.75C16.875 16.2527 17.0725 15.7758 17.4242 15.4242C17.7758 15.0725 18.2527 14.875 18.75 14.875Z" fill="#FB6D41"/>
                    </svg>
                    <p>500₽</p>
                </div>
                <div className={classes.container}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path d="M10.0625 0.5C12.7147 0.5 15.2582 1.55357 17.1336 3.42893C19.0089 5.3043 20.0625 7.84784 20.0625 10.5C20.0625 13.1522 19.0089 15.6957 17.1336 17.5711C15.2582 19.4464 12.7147 20.5 10.0625 20.5C7.41034 20.5 4.8668 19.4464 2.99143 17.5711C1.11607 15.6957 0.0625 13.1522 0.0625 10.5C0.0625 7.84784 1.11607 5.3043 2.99143 3.42893C4.8668 1.55357 7.41034 0.5 10.0625 0.5ZM9.125 5.1875V10.5C9.125 10.8125 9.28125 11.1055 9.54297 11.2812L13.293 13.7812C13.7227 14.0703 14.3047 13.9531 14.5938 13.5195C14.8828 13.0859 14.7656 12.5078 14.332 12.2188L11 10V5.1875C11 4.66797 10.582 4.25 10.0625 4.25C9.54297 4.25 9.125 4.66797 9.125 5.1875Z" fill="#FB6D41"/>
                    </svg>
                    <p>2 часа</p>
                </div>
              </div>
        </div>
        <section className={classes.area}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <h4 className={classes.title}>Зона доставки</h4>
                    <p className={classes.subTitle}>Мы доставляем цветы в пределах города и ближайших районов</p>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.card1}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                                        <g clip-path="url(#clip0_43_2257)">
                                        <path d="M10.4391 23.4C12.8438 20.3906 18.3281 13.0969 18.3281 9C18.3281 4.03125 14.2969 0 9.32812 0C4.35938 0 0.328125 4.03125 0.328125 9C0.328125 13.0969 5.8125 20.3906 8.21719 23.4C8.79375 24.1172 9.8625 24.1172 10.4391 23.4ZM9.32812 6C10.1238 6 10.8868 6.31607 11.4494 6.87868C12.0121 7.44129 12.3281 8.20435 12.3281 9C12.3281 9.79565 12.0121 10.5587 11.4494 11.1213C10.8868 11.6839 10.1238 12 9.32812 12C8.53248 12 7.76941 11.6839 7.2068 11.1213C6.6442 10.5587 6.32812 9.79565 6.32812 9C6.32812 8.20435 6.6442 7.44129 7.2068 6.87868C7.76941 6.31607 8.53248 6 9.32812 6Z" fill="#1F2937"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_43_2257">
                                        <path d="M0.328125 0H18.3281V24H0.328125V0Z" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Внутри города</h6>
                                <p className={classes.subTitle}>500 ₽</p>
                            </div>
                            <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                 <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.card2}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                                        <g clip-path="url(#clip0_43_2257)">
                                        <path d="M10.4391 23.4C12.8438 20.3906 18.3281 13.0969 18.3281 9C18.3281 4.03125 14.2969 0 9.32812 0C4.35938 0 0.328125 4.03125 0.328125 9C0.328125 13.0969 5.8125 20.3906 8.21719 23.4C8.79375 24.1172 9.8625 24.1172 10.4391 23.4ZM9.32812 6C10.1238 6 10.8868 6.31607 11.4494 6.87868C12.0121 7.44129 12.3281 8.20435 12.3281 9C12.3281 9.79565 12.0121 10.5587 11.4494 11.1213C10.8868 11.6839 10.1238 12 9.32812 12C8.53248 12 7.76941 11.6839 7.2068 11.1213C6.6442 10.5587 6.32812 9.79565 6.32812 9C6.32812 8.20435 6.6442 7.44129 7.2068 6.87868C7.76941 6.31607 8.53248 6 9.32812 6Z" fill="#1F2937"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_43_2257">
                                        <path d="M0.328125 0H18.3281V24H0.328125V0Z" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Пригород</h6>
                                <p className={classes.subTitle}>1000₽</p>
                            </div>
                            <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5E7EB"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                                        <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5E7EB"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </section>
        {/* <section className={classes.options}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <h4 className={classes.title}>Варианты доставки</h4>
                    <p className={classes.subTitle}>Выберите удобный для вас способ получения цветов</p>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.card1}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                                        <g clip-path="url(#clip0_43_2257)">
                                        <path d="M10.4391 23.4C12.8438 20.3906 18.3281 13.0969 18.3281 9C18.3281 4.03125 14.2969 0 9.32812 0C4.35938 0 0.328125 4.03125 0.328125 9C0.328125 13.0969 5.8125 20.3906 8.21719 23.4C8.79375 24.1172 9.8625 24.1172 10.4391 23.4ZM9.32812 6C10.1238 6 10.8868 6.31607 11.4494 6.87868C12.0121 7.44129 12.3281 8.20435 12.3281 9C12.3281 9.79565 12.0121 10.5587 11.4494 11.1213C10.8868 11.6839 10.1238 12 9.32812 12C8.53248 12 7.76941 11.6839 7.2068 11.1213C6.6442 10.5587 6.32812 9.79565 6.32812 9C6.32812 8.20435 6.6442 7.44129 7.2068 6.87868C7.76941 6.31607 8.53248 6 9.32812 6Z" fill="#1F2937"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_43_2257">
                                        <path d="M0.328125 0H18.3281V24H0.328125V0Z" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}></h6>
                                <p className={classes.subTitle}></p>
                            </div>
                            <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                                        <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.card2}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                                        <g clip-path="url(#clip0_43_2257)">
                                        <path d="M10.4391 23.4C12.8438 20.3906 18.3281 13.0969 18.3281 9C18.3281 4.03125 14.2969 0 9.32812 0C4.35938 0 0.328125 4.03125 0.328125 9C0.328125 13.0969 5.8125 20.3906 8.21719 23.4C8.79375 24.1172 9.8625 24.1172 10.4391 23.4ZM9.32812 6C10.1238 6 10.8868 6.31607 11.4494 6.87868C12.0121 7.44129 12.3281 8.20435 12.3281 9C12.3281 9.79565 12.0121 10.5587 11.4494 11.1213C10.8868 11.6839 10.1238 12 9.32812 12C8.53248 12 7.76941 11.6839 7.2068 11.1213C6.6442 10.5587 6.32812 9.79565 6.32812 9C6.32812 8.20435 6.6442 7.44129 7.2068 6.87868C7.76941 6.31607 8.53248 6 9.32812 6Z" fill="#1F2937"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_43_2257">
                                        <path d="M0.328125 0H18.3281V24H0.328125V0Z" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}></h6>
                                <p className={classes.subTitle}></p>
                            </div>
                            <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                                        <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
        <section className={classes.conditons}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <h4 className={classes.title}>
                        Условия доставки
                    </h4>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.card1}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M20 20.5H0V0.5H20V20.5Z" stroke="#E5E7EB"/>
                                    <path d="M10.625 4.25001C7.55469 4.25001 4.95703 6.26173 4.07422 9.03517C5.38672 8.3711 6.86719 8.00001 8.4375 8.00001H11.875C12.2188 8.00001 12.5 8.28126 12.5 8.62501C12.5 8.96876 12.2188 9.25001 11.875 9.25001H11.25H8.4375C7.78906 9.25001 7.16016 9.32423 6.55469 9.46095C5.54297 9.69142 4.60156 10.1016 3.76562 10.6602C1.49609 12.1719 0 14.7539 0 17.6875V18.3125C0 18.832 0.417969 19.25 0.9375 19.25C1.45703 19.25 1.875 18.832 1.875 18.3125V17.6875C1.875 15.7852 2.68359 14.0742 3.97656 12.875C4.75 15.8242 7.43359 18 10.625 18H10.6641C15.8242 17.9727 20 12.8867 20 6.6172C20 4.95314 19.707 3.3711 19.1758 1.94532C19.0742 1.67579 18.6797 1.68751 18.543 1.94142C17.8086 3.31642 16.3555 4.25001 14.6875 4.25001H10.625Z" fill="#E5FA3C"/>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Свежесть</h6>
                                <p className={classes.subTitle}>Гарантируем свежесть цветов</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.card2}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <g clip-path="url(#clip0_43_2238)">
                                <path d="M10 0.5C10.1797 0.5 10.3594 0.539063 10.5235 0.613281L17.8789 3.73438C18.7383 4.09766 19.3789 4.94531 19.375 5.96875C19.3555 9.84375 17.7617 16.9336 11.0313 20.1562C10.3789 20.4688 9.62111 20.4688 8.96877 20.1562C2.2383 16.9336 0.644549 9.84375 0.625018 5.96875C0.621112 4.94531 1.26174 4.09766 2.12111 3.73438L9.48049 0.613281C9.64064 0.539063 9.82033 0.5 10 0.5ZM10 3.10938V17.875C15.3906 15.2656 16.8399 9.48828 16.875 6.02344L10 3.10938Z" fill="#FB6D41"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_43_2238">
                                <path d="M0 0.5H20V20.5H0V0.5Z" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Упаковка</h6>
                                <p className={classes.subTitle}>Бережная упаковка для транспортировки</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.card3}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <g clip-path="url(#clip0_43_2241)">
                                <path d="M6.44141 1.46096C6.14062 0.734401 5.34766 0.347683 4.58984 0.554714L1.15234 1.49221C0.472656 1.67971 0 2.2969 0 3.00003C0 12.6641 7.83594 20.5 17.5 20.5C18.2031 20.5 18.8203 20.0274 19.0078 19.3477L19.9453 15.9102C20.1523 15.1524 19.7656 14.3594 19.0391 14.0586L15.2891 12.4961C14.6523 12.2305 13.9141 12.4141 13.4805 12.9492L11.9023 14.875C9.15234 13.5742 6.92578 11.3477 5.625 8.59768L7.55078 7.02346C8.08594 6.58596 8.26953 5.85159 8.00391 5.21487L6.44141 1.46487V1.46096Z" fill="#E5FA3C"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_43_2241">
                                <path d="M0 0.5H20V20.5H0V0.5Z" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Связь</h6>
                                <p className={classes.subTitle}>Курьер позвонит за 30 минут до прибытия</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.card4}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M20 20.5H0V0.5H20V20.5Z" stroke="#E5E7EB"/>
                                    <path d="M4.91016 6.75H6.875C7.56641 6.75 8.125 7.30859 8.125 8C8.125 8.69141 7.56641 9.25 6.875 9.25H1.875C1.18359 9.25 0.625 8.69141 0.625 8V3C0.625 2.30859 1.18359 1.75 1.875 1.75C2.56641 1.75 3.125 2.30859 3.125 3V5L3.8125 4.3125C7.23047 0.894531 12.7695 0.894531 16.1875 4.3125C19.6055 7.73047 19.6055 13.2695 16.1875 16.6875C12.7695 20.1055 7.23047 20.1055 3.8125 16.6875C3.32422 16.1992 3.32422 15.4062 3.8125 14.918C4.30078 14.4297 5.09375 14.4297 5.58203 14.918C8.02344 17.3594 11.9805 17.3594 14.4219 14.918C16.8633 12.4766 16.8633 8.51953 14.4219 6.07812C11.9805 3.63672 8.02344 3.63672 5.58203 6.07812L4.91016 6.75Z" fill="#FB6D41"/>
                                    </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Возврат</h6>
                                <p className={classes.subTitle}>Возврат средств, если не устроило качество</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className={classes.questions}>
            <div className={classes.container}>
                <div className={classes.titleContainer}>
                    <h4 className={classes.title}>Есть вопросы по доставке</h4>
                    <p className={classes.subTitle}>Наши операторы готовы помочь вам с выбором и оформлением заказа</p>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.card1}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <g clip-path="url(#clip0_43_2275)">
                                <path d="M10.2656 0.5C12.9178 0.5 15.4613 1.55357 17.3367 3.42893C19.2121 5.3043 20.2656 7.84784 20.2656 10.5C20.2656 13.1522 19.2121 15.6957 17.3367 17.5711C15.4613 19.4464 12.9178 20.5 10.2656 20.5C7.61346 20.5 5.06992 19.4464 3.19456 17.5711C1.31919 15.6957 0.265625 13.1522 0.265625 10.5C0.265625 7.84784 1.31919 5.3043 3.19456 3.42893C5.06992 1.55357 7.61346 0.5 10.2656 0.5ZM9.32812 5.1875V10.5C9.32812 10.8125 9.48438 11.1055 9.74609 11.2812L13.4961 13.7812C13.9258 14.0703 14.5078 13.9531 14.7969 13.5195C15.0859 13.0859 14.9688 12.5078 14.5352 12.2188L11.2031 10V5.1875C11.2031 4.66797 10.7852 4.25 10.2656 4.25C9.74609 4.25 9.32812 4.66797 9.32812 5.1875Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_43_2275">
                                <path d="M0.265625 0.5H20.2656V20.5H0.265625V0.5Z" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Режим работы</h6>
                                <p className={classes.subTitle}>Круглосуточно</p>
                            </div>
                            {/* <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                        <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className={classes.card2}>
                        <div className={classes.continer}>
                            <div className={classes.iconContiner}>
                                <div className={classes.icon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                <g clip-path="url(#clip0_43_2272)">
                                <path d="M6.73828 1.46084C6.4375 0.734279 5.64453 0.34756 4.88672 0.554592L1.44922 1.49209C0.769531 1.67959 0.296875 2.29678 0.296875 2.9999C0.296875 12.664 8.13281 20.4999 17.7969 20.4999C18.5 20.4999 19.1172 20.0272 19.3047 19.3476L20.2422 15.9101C20.4492 15.1522 20.0625 14.3593 19.3359 14.0585L15.5859 12.496C14.9492 12.2304 14.2109 12.414 13.7773 12.9491L12.1992 14.8749C9.44922 13.5741 7.22266 11.3476 5.92188 8.59756L7.84766 7.02334C8.38281 6.58584 8.56641 5.85147 8.30078 5.21475L6.73828 1.46475V1.46084Z" fill="#1F2937"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_43_2272">
                                <path d="M0.296875 0.5H20.2969V20.5H0.296875V0.5Z" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                                </div>
                            </div>
                            <div className={classes.titleContiner}>
                                <h6 className={classes.title}>Телефон</h6>
                                <p className={classes.subTitle}>+7 (495) 123-45-67</p>
                            </div>
                            {/* <div className={classes.textContiner}>
                                <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>Доставка за 2 часа</p>
                                </div>
                                                        <div className={classes.text}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                                    <g clip-path="url(#clip0_43_2148)">
                                    <path d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z" fill="#E5FA3C"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_43_2148">
                                    <path d="M0 0H14V16H0V0Z" fill="white"/>
                                    </clipPath>
                                    </defs>
                                    </svg>
                                    <p>До двери</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className={classes.buttonContiner}>
                    <button onClick={() => hendlePayment()} className={classes.item}>
                        Связаться с нами
                    </button>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Delivery