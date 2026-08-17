import { useContext } from "react"
import { ShoppingCartContext } from "../../context"
import ProductTile from "../../components/productTile"
import CartButton from "../../components/cart/cartButton"
function ProductListPage(){
    const {listOfProducts,loading}=useContext(ShoppingCartContext)
    if(loading)return <h1>loading data pls wait</h1>
    return (
        <section className="relative py-6 bg-white sm:py-8 lg:py-10">
            
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

                <div className="flex items-center justify-between">
                    <h2 className="text-4xl font-semibold text-gray-950 sm:text-5xl lg:text-6xl">Shopping Cart</h2>
                    <CartButton/>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
                    {
                        listOfProducts&&listOfProducts.length>0?
                        listOfProducts.map(singleProductTile=><ProductTile key={singleProductTile?.id} singleProductTile={singleProductTile}/>)
                        :<h3>no product found</h3>
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductListPage