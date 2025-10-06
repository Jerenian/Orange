import React, { useEffect } from 'react'
import classes from './style.module.scss'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { useLoginMutation } from '../../features/userSlice/authApiSlice'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/userSlice/authSlice'
const Login = () => {

    const [user, setUser] = useState({login: '', password: ''})
    const [setLogin, {isLoading}] = useLoginMutation()
    const [errors, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = async () => {
        try {
            const userData = await setLogin({login: user.login, password: user.password}).unwrap()
            dispatch(setCredentials({...userData, user}))
            setUser({...user, login: '', password: ''})
        } catch (err) {
            if (!err?.status) {
                setError('No Server Response');
            } else if (err.status === 400) {
                setError('Missing Username or Password');
            } else if (err.status === 401) {
                setError('Unauthorized');
                console.log(errors)
            } else {
                setError('Login Failed');
            }
            
        }
    }
    useEffect(() => {
        setError('')
    },[user] )
  return (
    <div className={classes.wrapper}>
        <div>{errors}</div>
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
                    <p>Нет аккаунта?</p>
                    <NavLink to='/signUp'><button className={classes.alter}>Зарегестрироваться</button></NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login