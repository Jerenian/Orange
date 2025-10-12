import React from 'react'
import { useCheckQuery } from '../../services/user'
import { useNavigate } from 'react-router'
import classes from './style.module.scss'
const User = () => {
    const user = useCheckQuery(null)
    const navigate = useNavigate()
    if(user.error){ // настроить чтобы при переходе c login вызывалаьс функция useCheckQuery

        navigate('/login')

    }
    if(user.data)
    {
        
       return (
          <div className={classes.wrapper}>
              <div className={classes.container}>
                  <h2>Вы авторизованы под под именем {user.data.name}</h2>
              </div>
          </div>
        )
    }
}

export default User