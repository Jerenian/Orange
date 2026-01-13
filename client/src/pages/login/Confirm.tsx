
import classes from './Style.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCheckByClickMutation } from '../../services/user'
const Confirm = () => {
    const [check] = useCheckByClickMutation()
    const [errors, setError] = useState("")
    const navigate = useNavigate()
    const handleClick = async () => {
        const userData = await check(null)
        const body: any = userData
        console.log(body)
        if(body?.error || !body?.data.isActivated){
            setError('Активация не произошла')
        }
        else if(body?.data.isActivated){
        navigate('/user') 
        window.location.reload()
        }
    }

  return (
    <div className={classes.wrapper}>
        
        <div className={classes.continer}>
            <div className={classes.item}>
                <div className={classes.title}>
                    Вам пришло сообщение на почту с поддтвержденим
                </div>
                <div className={classes.buttons}>
                    <button
                    onClick={() => handleClick()}
                    className={classes.main}>
                        я уже перешел по ссылке
                    </button>
                </div>
                 <div style={{textAlign: 'center', color: 'red'}}>{errors}</div>
            </div>
        </div>
    </div>
  )
}

export default Confirm