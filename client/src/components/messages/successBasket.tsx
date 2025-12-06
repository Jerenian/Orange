
import { useSelector } from 'react-redux'
import classes from './style.module.scss'
const SuccessBasket = () => {
    const message = useSelector((state:any) => state.message.visible)
  return (
      <div className={message ? classes.wrapper : classes.unwrapper} >
          <p>Товар добавлен в корзину</p>
      </div>
  )
}

export default SuccessBasket