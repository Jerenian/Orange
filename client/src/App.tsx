
import {Routes,Route, NavLink} from "react-router"
import About from "./pages/about/about"
import Basket from "./pages/basket/basket"
import Contacts from "./pages/contacts/contacts"
import Delivery from "./pages/delivery/delivery"
import Favorite from "./pages/favorite/favorite"
import Main from "./pages/main/main"
import Layout from "./components/layout/Layout"
import Payment from "./components/payment/payment"
import CatalogId from "./pages/main/catalog/CatalogId"
import Gift from "./pages/main/category/gift/Gift"
import Wedding from "./pages/main/category/wedding/Wedding"
import Spring from "./pages/main/category/spring/Spring"
import Romantic from "./pages/main/category/romantic/Romantic"
import Catalog from "./pages/main/catalog/catalog"
import Modal from "./components/modal/Modal"
import Login from "./pages/login/login"
import SignUp from "./pages/login/SignUp"
function App() {
  return (
    <div>
      <Modal></Modal>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Main />} ></Route>
                <Route path="/category/gift" element={<Gift></Gift>}></Route>
                <Route path="/category/romantic" element={<Romantic></Romantic>}></Route>
                <Route path="/category/spring" element={<Spring></Spring>}></Route>
                <Route path="/category/wedding" element={<Wedding></Wedding>}></Route>
                <Route path="/category" element={<Catalog></Catalog>}></Route>
                <Route path="/catalog/:id" element={<CatalogId></CatalogId>}></Route>
                <Route path="/catalog" element={<Catalog></Catalog>}></Route>
          <Route path="about" element={<About />} />
          <Route path="basket" element ={<Basket/>} />
          <Route path="contact" element ={<Contacts/>} />
          <Route path="delivery" element ={<Delivery/>} />
          <Route path="favorite" element ={<Favorite/>} />
          <Route path="payment" element ={<Payment/>} />
          <Route path="login" element={<Login/>}></Route>
          <Route path="signUp" element={<SignUp/>}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
