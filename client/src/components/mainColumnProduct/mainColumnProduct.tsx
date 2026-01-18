
import classes from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useAddFavoriteMutation } from '../../services/favorite'
import { useNavigate } from 'react-router'
import { getFavorite } from '../../features/favoriteSlice/favoriteSlice'
import { getBasket } from '../../features/basketSlice/basketSlice'
import { changeProductInfo } from '../../features/modalSlice/ModalSlice'
import { useAddBasketMutation, useRemoveMutation } from '../../services/basket'
const MainColumnProduct = ({data}: any) => {
    const [setFavorite] = useAddFavoriteMutation()
    const [setBasket] = useAddBasketMutation()
    const dataFavorites = useSelector((state: any) => state.favorite.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [remove] = useRemoveMutation()
    const dataTypes = useSelector((state: any) => state.type.types)
    const typeName = dataTypes?.find((item:any) => item.id === data.typeId)?.name
    const like = dataFavorites?.find((item:any) => item.productId == data.id)
        const addFavorite = async (id: string, e:any) => {
        e.stopPropagation()
        const favorite = await setFavorite(id)
        const data = favorite
        if(data?.error){
            navigate('/login')
        }
        if(!data?.error) {
            dispatch(getFavorite(data.data))
        }
    }
    const addBasket = async(id: string) => {
        const basket = await setBasket(id)
        const data = basket
        if(data?.error){
            navigate('/login')
        }
        if(!data?.error) {
            dispatch(getBasket(data.data))
        }
    }
    const removeBasket = async (id: string) =>{
        const basket = await remove(id as any)
        const data:any = basket
        if(data?.error?.status){
            navigate('/login')
        } else {
            dispatch(getBasket(data.data))
        }
    }
  return (
    <div onClick={() => dispatch(changeProductInfo(data))} className={classes.wrapper}>
        

        <div className={classes.container}>

            <div className={classes.image}>
                            {
                like?.productId === data.id ?
                (
                    <div onClick={(e) => addFavorite(data.id, e)} className={classes.favorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                        <path d="M1.30156 7.46406L6.24258 12.0769C6.44766 12.2684 6.71836 12.375 7 12.375C7.28164 12.375 7.55234 12.2684 7.75742 12.0769L12.6984 7.46406C13.5297 6.69023 14 5.60468 14 4.46992V4.31132C14 2.39999 12.6191 0.770306 10.7352 0.455853C9.48828 0.248041 8.21953 0.655463 7.32812 1.54687L7 1.87499L6.67188 1.54687C5.78047 0.655463 4.51172 0.248041 3.26484 0.455853C1.38086 0.770306 0 2.39999 0 4.31132V4.46992C0 5.60468 0.470312 6.69023 1.30156 7.46406Z" fill="#F42828"/>
                        </svg>
                    </div>
                )
                : 
                (
                    <div onClick={(e) => addFavorite(data.id, e)} className={classes.favorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                        <path d="M1.30156 7.46406L6.24258 12.0769C6.44766 12.2684 6.71836 12.375 7 12.375C7.28164 12.375 7.55234 12.2684 7.75742 12.0769L12.6984 7.46406C13.5297 6.69023 14 5.60468 14 4.46992V4.31132C14 2.39999 12.6191 0.770306 10.7352 0.455853C9.48828 0.248041 8.21953 0.655463 7.32812 1.54687L7 1.87499L6.67188 1.54687C5.78047 0.655463 4.51172 0.248041 3.26484 0.455853C1.38086 0.770306 0 2.39999 0 4.31132V4.46992C0 5.60468 0.470312 6.69023 1.30156 7.46406Z" fill="#6D6A6A"/>
                        </svg>
                    </div>
                )
            }
                <img decoding="async" loading="lazy" src={`${import.meta.env.VITE_API_URL}${data.img}`} alt="Картинок пока нет : (" />
            </div>
            <div onClick={(e) => e.stopPropagation()} className={classes.quantity}>
                <div className={classes.container}>
                    <div className={classes.title}>
                        Количество
                    </div>
                    <div className={classes.content}>
                        <button onClick={() => removeBasket(data.id) } >-</button>
                        <div className={classes.count} >
                            {data.quantity}
                        </div>
                        <button onClick={() => addBasket(data.id)} >+</button>
                    </div>
                </div>
            </div>
            <div className={classes.info}>
                <div className={classes.title}>
                    <h4 className={classes.item}>{data.name}</h4>
                    {
                        data?.selectPalette ? (
                            <div className={classes.palette}>
                                <p>Цвет : </p>
                                {
                                    typeName.toUpperCase() == "ОТКРЫТКИ" ?  (
                                        <p className={classes.numberItem} >
                                            {data.selectPalette}
                                        </p>
                                    ) : (
                                        <p style={{background: data.selectPalette}} className={classes.paletteItem}></p>
                                    )
                                
                                }
                            </div>
                        ): null
                    }
                </div>

                <div className={classes.priceContainer}>
                    <span>{data.price} ₽ / шт</span> 
                </div>                              
            </div>                                         
        </div>
    </div>
  )
}

export default MainColumnProduct