import { createContext, useState, useEffect } from "react";







export const ShoppingCartContext=createContext(null)


function ShoppingCartProvider({children}){
    const [loading,setLoading]=useState(true)
    const [listOfProducts,setListOfProducts]=useState([])
    async function fetchListOfProducts(){
        try{
            const apiResponse=await fetch('https://dummyjson.com/products');
            const result=await apiResponse.json()
            console.log(result)
            if(result&&result?.products){
                setListOfProducts(result?.products)
                setLoading(false)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchListOfProducts()
    },[])


    return <ShoppingCartContext.Provider value={{listOfProducts,loading}}>
        {children}
    </ShoppingCartContext.Provider>
}
export default ShoppingCartProvider