import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage(){
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        ()=>{
            if(isLoading){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then(
                    (res)=>{                       
                        setProducts(res.data)
                        setIsLoading(false)
                    }
                )   
            }
        },[isLoading]
    )

    return(
        <div className="w-full h-full flex flex-wrap justify-center items-center">  {/*width ek hri height ek hri api dil thiyen gnt awoth ilg ekin aramba krnn kiyl kiynne flex-wrap ekn */}
            {
                products.map((product)=>{
                    return(
                        <ProductCard key={product.productId} product={product}/>     //api newth newth mew rendor krgnnw nm key ekk denn on
                    )
                })
            }
            
        </div>
    )
}