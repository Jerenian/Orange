
import {Routes,Route} from "react-router"
import About from "./pages/about/about"
import Basket from "./pages/basket/basket"
import Contacts from "./pages/contacts/contacts"
import Delivery from "./pages/delivery/delivery"
import Favorite from "./pages/favorite/favorite"
import Main from "./pages/main/main"
import Layout from "./components/layout/Layout"
import CatalogId from "./pages/main/catalog/catalogId"
import Catalog from "./pages/main/catalog/catalog"
import Modal from "./components/modal/Modal"
import Login from "./pages/login/Login"
import SignUp from "./pages/login/SignUp"
import User from "./pages/user/user"
import { useGetFavoriteQuery } from "./services/favorite"
import { useGetBasketQuery } from "./services/basket"
import { useCheckQuery } from "./services/user"
import { useDispatch } from "react-redux"
import { getFavorite } from "./features/favoriteSlice/favoriteSlice"
import { getUserInfo } from "./features/userSlice/userSlice"
import ProductModal from "./components/modal/ProductModal"
import TypeModal from "./components/modal/TypeModal"
import EditTypeModal from "./components/modal/EditTypeModal"
import EditProductModal from "./components/modal/EditProductModal"
import NumberModal from "./components/modal/Number"
import DeleteTypeModal from "./components/modal/DeleteTypeModal"
import Menu from "./components/menu/menu"
import ProductInfoModal from "./components/modal/ProductInfoModal"
import DeleteProductModal from "./components/modal/DeleteProductModal"
import './Style.css'
import { useEffect } from "react"
import { getBasket } from "./features/basketSlice/basketSlice"
import { useGetOrdersQuery } from "./services/order"
import { getOrders } from "./features/orderSlice/orderSlice"
import Orders from "./pages/orders/orders"
import { useGetAllProductsQuery } from "./services/product"
import { allProducts } from "./features/productSlice/ProductSlice"
import { useGetAllTypesQuery } from "./services/type"
import { getTypes } from "./features/TypeSlice/TypeSlice"
import SuccessBasket from "./components/messages/successBasket"
import { Oval } from 'react-loader-spinner'
import Confirm from "./pages/login/Confirm"
const App = () => {
  const dataFavorite = useGetFavoriteQuery(null)
  const dataOrders = useGetOrdersQuery(null)
  const dataBasket = useGetBasketQuery(null)
  const dataProducts = useGetAllProductsQuery(null)
  const user: any = useCheckQuery(null)
  const dataTypes = useGetAllTypesQuery(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(allProducts(dataProducts.data))
    dispatch(getOrders(dataOrders.data))
    dispatch(getUserInfo(user.data))
    dispatch(getFavorite(dataFavorite.data))
    dispatch(getBasket(dataBasket.data))
    dispatch(getTypes(dataTypes.data))
  }, [user, dataFavorite, dataOrders, dataBasket, dataProducts, dataTypes])
  return (
    <div className="app">
        <SuccessBasket></SuccessBasket>
        <NumberModal></NumberModal>
        <TypeModal></TypeModal>
        <Modal></Modal>
        <ProductModal></ProductModal>
        <EditTypeModal></EditTypeModal>
        <EditProductModal></EditProductModal>
        <DeleteTypeModal></DeleteTypeModal>
        <Menu></Menu>
        <ProductInfoModal></ProductInfoModal>
        <DeleteProductModal></DeleteProductModal>
        <div className="wrapper">
            {
            dataBasket?.isLoading || dataFavorite?.isLoading || dataProducts?.isLoading || dataTypes?.isLoading  ? (
                <div className='loader'>
                    <div className='loaderItem'>
                        <Oval
                        height="80"
                        width="80"
                        secondaryColor= '#FB6D41'
                        color="#E5FA39"
                        ariaLabel="three-dots-loading"
                        strokeWidth='3'
                        />
                    </div> 
                </div>
            ) : (
            <Routes>
                <Route element={<Layout/>}>
                <Route index element={<Main />} ></Route>
                <Route path="/catalog/:id" element={<CatalogId></CatalogId>}></Route>
                <Route path="/catalog" element={<Catalog></Catalog>}></Route>
                <Route path="about" element={<About />} />
                <Route path="basket" element ={<Basket/>} />
                <Route path="contact" element ={<Contacts/>} />
                <Route path="delivery" element ={<Delivery/>} />
                <Route path="favorite" element ={<Favorite/>} />
                <Route path="login" element={<Login/>}></Route>
                <Route path="confirm" element={<Confirm/>}></Route>
                <Route path="signUp" element={<SignUp/>}></Route>
                <Route path="user" element={<User/>}></Route>
                {
                    user?.data?.role === "admin" ? (
                    <Route path="orders" element={<Orders/>}></Route>
                    ) : null
                }
                </Route>
            </Routes>
            )}
        </div>
    </div>
  )
}

export default App
