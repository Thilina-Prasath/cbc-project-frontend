import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart.js"
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi"
import { Link } from "react-router-dom";

export default function CartPage(){
    const [cart,setCart] = useState(getCart())

    // Helper function to safely convert to number and format
    const formatPrice = (price) => {
        const numPrice = Number(price);
        return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
    };

    // Helper function to check if price is valid number
    const isValidPrice = (price) => {
        return price != null && !isNaN(Number(price)) && Number(price) > 0;
    };

    return(
        <div className="w-full max-w-full  h-full flex flex-col items-center pt-4 relative ">
            <div className="z-50 hidden  w-[320px] h-[80px] shadow-2xl absolute bottom-1 md:top-1 right-1 md:flex flex-col justify-center items-center">
                <p className="text-2xl text-secondary font-bold">Total: 
                    <span className="text-accent font-bold mx-2">
                        {getTotal().toFixed(2)}
                    </span>
                </p>
                <Link to="/checkout" state={
                    {
                        cart: cart
                    }
                } className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300">
                    Checkout
                </Link>
            </div>
            {
                cart.map(
                    (item)=>{
                        return(             // sudu pt kotu hdgnn 
                            <div key={item.productId} className="w-[600px] my-4 h-[100px] rounded-tl-3xl rounded-bl-3xl bg-primary shadow-2xl flex flex-row relative justify-center items-center">
                                <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                                <div className="w-[250px] h-full flex flex-col justify-center items-start pl-4">
                                    <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                                    <h1 className="text-md text-gray-600 font-semibold">{item.productId}</h1>
                                    {
                                        isValidPrice(item.labelledPrice) && isValidPrice(item.price) && Number(item.labelledPrice) > Number(item.price) ?
                                        <div>
                                            <span className="text-md mx-1 text-gray-500 line-through">{formatPrice(item.labelledPrice)}</span>
                                            <span className="text-md mx-1 font-bold text-accent">{formatPrice(item.price)}</span>
                                        </div>
                                        : isValidPrice(item.price) ?
                                        <span className="text-md mx-1 font-bold text-accent">{formatPrice(item.price)}</span>
                                        : <span className="text-md mx-1 font-bold text-accent">Price unavailable</span>
                                    }
                                </div>
                                <div className="max-w-[100px] w-[100px]  h-full flex flex-row justify-evenly items-center">
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
                                    onClick={()=>{
                                        addToCart(item , -1)
                                        setCart(getCart())
                                    }}
                                    ><BiMinus/></button>
                                    <h1 className="text-xl text-secondary font-semibold h-full flex items-center">{item.qty}</h1>
                                    <button className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer  aspect-square bg-accent"  onClick={()=>{
                                        addToCart(item , 1)
                                        setCart(getCart())
                                    }}
                                    
                                    ><BiPlus/></button>                                
                                </div>
                                {/* total */}
                                <div className="w-[200px] h-full flex flex-col justify-center items-end pr-4">
                                    <h1 className="text-2xl text-secondary font-semibold">Rs. {formatPrice(Number(item.price) * Number(item.qty))}</h1>
                                </div>
                                {/* remove */}
                                <button className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-[-35px] "onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCart(getCart())
                                    }
                                }>
                                    <BiTrash/>
                                </button>
                            </div> 
                        )
                    }
                )
            }
        </div>
    )
}