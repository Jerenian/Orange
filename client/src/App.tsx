
import {Routes,Route, NavLink} from "react-router"
import About from "./pages/about/about"
import Basket from "./pages/basket/basket"
import Contacts from "./pages/contacts/contacts"
import Delivery from "./pages/delivery/delivery"
import Favorite from "./pages/favorite/favorite"
import Main from "./pages/main/main"
import Layout from "./components/Layout/Layout"
import Payment from "./components/payment/payment"
import Balloons from "./pages/main/catalog/balloons/Balloons"
import Flowers from "./pages/main/catalog/flowers/Flowers"
import Boquets from "./pages/main/catalog/boquets/Boquets"
import Gift from "./pages/main/category/gift/Gift"
import Toys from "./pages/main/catalog/toys/Toys"
import Composition from "./pages/main/catalog/composition/Composition"
import Wedding from "./pages/main/category/wedding/Wedding"
import Spring from "./pages/main/category/spring/Spring"
import Romantic from "./pages/main/category/romantic/Romantic"
import Catalog from "./pages/catalog/Catalog"

function App() {


  return (
    <div>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Main />} ></Route>
                <Route path="/category/gift" element={<Gift></Gift>}></Route>
                <Route path="/category/romantic" element={<Romantic></Romantic>}></Route>
                <Route path="/category/spring" element={<Spring></Spring>}></Route>
                <Route path="/category/wedding" element={<Wedding></Wedding>}></Route>
                <Route path="/category" element={<Catalog></Catalog>}></Route>
                <Route path="/catalog/balloons" element={<Balloons></Balloons>}></Route>
                <Route path="/catalog/composition" element={<Composition></Composition>}></Route>
                <Route path="/catalog/flowers" element={<Flowers></Flowers>}></Route>
                <Route path="/catalog/boquets" element={<Boquets></Boquets>}></Route>
                <Route path="/catalog/toys" element={<Toys></Toys>}></Route>
          <Route path="about" element={<About />} />
          <Route path="basket" element ={<Basket/>} />
          <Route path="contact" element ={<Contacts/>} />
          <Route path="delivery" element ={<Delivery/>} />
          <Route path="favorite" element ={<Favorite/>} />
          <Route path="payment" element ={<Payment/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
