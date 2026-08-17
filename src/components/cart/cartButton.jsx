import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCartContext } from "../../context"

function CartButton(){
    const {cartItems}=useContext(ShoppingCartContext)
    const navigate=useNavigate()
    const totalItems=cartItems.reduce((total,item)=>total+item.quantity,0)
    return(
        <button onClick={()=>navigate('/cart')} className="relative flex items-center gap-2 px-5 py-3 bg-black text-white rounded-md font-bold">
            <span className="text-xl">🛒</span>
            <span>Cart</span>
            <span className="flex items-center justify-center min-w-6 h-6 px-1 bg-white text-black rounded-full text-sm">{totalItems}</span>
        </button>
    )
}
export default CartButton