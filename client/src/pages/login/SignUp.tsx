import  { useState } from 'react'
import classes from './Style.module.scss'
import { NavLink } from 'react-router'
import { useRegisterMutation } from '../../services/user'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../features/userSlice/userSlice'
const SignUp = () => {
    const [user, setUser] = useState( {name:"", login: "", password: "", checkPassword: ""})
    const [errors, setError] = useState("")
    const [setLogin] = useRegisterMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleClick = async () => {
        if(user.checkPassword === user.password) {
            const payload = {name: user.name, login: user.login, password: user.password}
            const data = await setLogin(payload)
            if(data?.error){
                const error: any = data.error
                setError(error.data.message)
            } else {
            localStorage.clear()
            localStorage.setItem('accessToken', data?.data.accessToken)
            dispatch(getUserInfo(data.data))
            navigate('/') 
            }
        } else {
            setError("Пароли не совпадают!")
        }
    }
  return (
    <div className={classes.wrapper}>
        <div className={classes.continer}>
            <div className={classes.item}>
                <div className={classes.title}>
                    Регистрация
                </div>
                <div className={classes.inputContiner}>
                    <input 
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})} placeholder="Имя" type="text" />
                    <input 
                    value={user.login}
                    onChange={(e) => setUser({...user, login : e.target.value})} placeholder='Email' type="text" className={classes.login} />
                    <input 
                    value={user.password}
                    onChange={(e) => setUser({...user, password : e.target.value})} placeholder='Пароль' type="password" className={classes.password} />
                    <input 
                    onChange={(e) => setUser({...user, checkPassword : e.target.value})} placeholder='Повторите пароль' type="password" className={classes.login} />
                    </div>
                <div className={classes.buttons}>
                    <button onClick={() => handleClick()} className={classes.main}>Зарегистрироваться</button>
                    <NavLink to='/login'><button className={classes.alter}>Есть аккаунт</button></NavLink>
                </div>
                <div className={classes.messages}>
                    <span>{errors}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
