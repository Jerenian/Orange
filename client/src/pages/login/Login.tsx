import React, { useEffect } from 'react'
import classes from './style.module.scss'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { useLoginMutation } from '../../services/user'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
const Login = () => {

    const [user, setUser] = useState({login: '', password: ''})
    const [setLogin, {isLoading}] = useLoginMutation()
    const [errors, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = async () => {
        const userData = await setLogin({login: user.login, password: user.password})
        const body = userData
        if(body?.error?.status === 400){
            setError('Пользователь с таким email не найден')
        }
        else{
        localStorage.clear()
        localStorage.setItem('accessToken', body.data.accessToken)
        navigate('/user') 
        window.location.reload()
        }

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
                    placeholder='Email' 
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
                    <button onClick={() => handleClick()} className={classes.main}>Войти</button>
                    <div style={{color: 'red'}}>{errors}</div>
                    <p>Нет аккаунта?</p>
                    <NavLink to='/signUp'><button className={classes.alter}>Зарегестрироваться</button></NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login