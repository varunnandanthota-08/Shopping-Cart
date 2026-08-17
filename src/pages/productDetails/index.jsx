import { useContext,useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";
import CartButton from "../../components/cart/cartButton"
function ProductDetailsPage(){
    const {id}=useParams();
    const {productDetails,setProductDetails,loading,setLoading,handleAddToCart,cartItems}=useContext(ShoppingCartContext);
    async function fetchProductDetails(){
        try{
            const apiResponse=await fetch(`https://dummyjson.com/products/${id}`);
            const result=await apiResponse.json();
            if(result){
                setProductDetails(result);
                setLoading(false);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    useEffect(()=>{
        fetchProductDetails();
    },[id]);
    if(loading){
        return <h1>fetching....</h1>;
    }
    return(
        <div className="relative">
            <div className="absolute top-6 right-6 z-10">
                <CartButton/>
            </div>
            <div className="p-6 max-w-4xl lg:max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-12 shadow-sm p-6">
                    <div className="lg:col-span-3 w-full lg:sticky lg:top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-lg relative">
                            <img className="w-4/5 mx-auto rounded object-contain" src={productDetails?.thumbnail} alt={productDetails?.title}/>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            {
                                productDetails?.images?.length?
                                productDetails.images.map(imageItem=>(
                                    <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                                        <img src={imageItem} className="w-24 h-24 object-contain cursor-pointer" alt="product secondary image"/>
                                    </div>
                                ))
                                :null
                            }
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-[#333333]">{productDetails?.title}</h2>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <p className="text-xl font-bold">${productDetails?.price}</p>
                        </div>
                        <div>
                            <button disabled={cartItems&&cartItems.findIndex(item=>item.id===productDetails?.id)>-1} onClick={()=>handleAddToCart(productDetails,true)} className="disabled:opacity-65 mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;