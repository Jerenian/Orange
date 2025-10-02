import React from 'react'
import classes from './style.module.scss'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { useLoginMutation } from '../../services/user'
import { useNavigate } from 'react-router'
const Login = () => {

    const [user, setUser] = useState({login: '', password: ''})
    const [setLogin, {isLoading}] = useLoginMutation()
    const navigate = useNavigate()
    const handleClick = async () => {
        const res = await setLogin(user).unwrap()
        navigate('/')
        console.log(res)
    }

  return (
    <div className={classes.wrapper}>
        <div className={classes.continer}>
            <div className={classes.item}>
                <div className={classes.title}>
                    Авторизация
                </div>
                <div className={classes.inputContiner}>
                    <input 
                    value={user.login}
                    onChange={(e) => setUser({...user, login: e.target.value})}
                    placeholder='Логин' 
                    type="text" 
                    className={classes.login} />
                    <input 
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    value={user.password}
                    placeholder='Пароль' 
                    type="password" 
                    className={classes.password} />
                </div>
                <div className={classes.buttons}>
                    <button onClick={() => handleClick()} className={classes.logIn}>Войти</button>
                    <NavLink to='/signUp'><button className={classes.signUp}>Зарегестрироваться</button></NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login