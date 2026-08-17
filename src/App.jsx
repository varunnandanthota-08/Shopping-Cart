import { Fragment } from 'react'
import {Route,Routes} from 'react-router-dom'
import ProductListPage from './pages/productList'
import ProductDetailsPage from './pages/productDetails'
import CartListPage from './pages/CartList'

function App() {
  return <Fragment>
    <Routes>
      <Route path="/products" element={<ProductListPage/>}/>
      <Route path="/product-Details/:id" element={<ProductDetailsPage/>}/>
      <Route path="/cart" element={<CartListPage/>}/>
    </Routes>
  </Fragment>
}

export default App
