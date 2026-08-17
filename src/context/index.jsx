import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";







export const ShoppingCartContext=createContext(null)


function ShoppingCartProvider({children}){
    const [loading,setLoading]=useState(true)
    const [listOfProducts,setListOfProducts]=useState([])
    const [productDetails,setProductDetails]=useState(null)
    const [cartItems,setCartItems]=useState([])
    const navigate=useNavigate()
    async function fetchListOfProducts(){
        try{
            const apiResponse=await fetch('https://dummyjson.com/products');
            const result=await apiResponse.json()
            if(result&&result?.products){
                setListOfProducts(result?.products)
                setLoading(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }
    function handleAddToCart(getProductDetails,shouldNavigate=false){
        console.log(getProductDetails)
        let cpyExistingCartItems=[...cartItems];
        const findIndexOfCurrItem=cpyExistingCartItems.findIndex(cartItem=>cartItem.id===getProductDetails.id)
        console.log(findIndexOfCurrItem)
        if(findIndexOfCurrItem===-1){
            cpyExistingCartItems.push({
                ...getProductDetails,
                quantity:1,
                totalPrice:getProductDetails?.price
            })
        }
        else{
            console.log('comming')
            cpyExistingCartItems[findIndexOfCurrItem]={
                ...cpyExistingCartItems[findIndexOfCurrItem],
                quantity:cpyExistingCartItems[findIndexOfCurrItem].quantity+1,
                totalPrice:(cpyExistingCartItems[findIndexOfCurrItem].quantity+1)*(cpyExistingCartItems[findIndexOfCurrItem].price)
            }
        }
        console.log(cpyExistingCartItems)
        setCartItems(cpyExistingCartItems)
        localStorage.setItem('cartItems',JSON.stringify(cpyExistingCartItems))
        if(shouldNavigate){
            navigate('/cart')
        }
    }
    function handleRemoveFromCart(getProductDetails,isFullyRemovedFromCart){
        let cpyExsistingCartItems=[...cartItems];
        const findIndexOfCurrentCartItem=cpyExsistingCartItems.findIndex(item=>item.id===getProductDetails.id);
        if(isFullyRemovedFromCart){
            cpyExsistingCartItems.splice(findIndexOfCurrentCartItem,1)
        }
        else{
            cpyExsistingCartItems[findIndexOfCurrentCartItem]={
                ...cpyExsistingCartItems[findIndexOfCurrentCartItem],
                quantity:cpyExsistingCartItems[findIndexOfCurrentCartItem].quantity-1,
                totalPrice:(cpyExsistingCartItems[findIndexOfCurrentCartItem].quantity-1)*(cpyExsistingCartItems[findIndexOfCurrentCartItem].price)
            }
        }
        localStorage.setItem('cartItems',JSON.stringify(cpyExsistingCartItems))
        setCartItems(cpyExsistingCartItems)
    }
    useEffect(()=>{
        fetchListOfProducts()
        setCartItems(JSON.parse(localStorage.getItem('cartItems')||"[]"))
    },[])


    return <ShoppingCartContext.Provider value={{listOfProducts,loading,setLoading,productDetails,setProductDetails,handleAddToCart,cartItems,handleRemoveFromCart}}>
        {children}
    </ShoppingCartContext.Provider>
}
export default ShoppingCartProvider