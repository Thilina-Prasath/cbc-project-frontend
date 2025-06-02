import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverviewPage() {
	const params = useParams();       // overview ek pssen en id ek kiyw gnn thmi mek dnne
	const productId = params.id;           // productId ek kiyw gnn
	const [status, setStatus] = useState("loading"); //loading , success , error
	const [product, setProduct] = useState(null);

	useEffect(() => {             //useEffect meken wenne en id ek backend ekt ywl me id ekt data thiye nm e data gnn ek 
		axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
			.then((response) => {
				console.log(response.data);
				setProduct (response.data); 
				setStatus("success");
			})
			.catch((error) => {
				console.log(error);
				setStatus("error");
				toast.error("Error fetching product details");
			});
	}, []);

	// Helper function to safely convert to number and format
	const formatPrice = (price) => {
		const numPrice = Number(price);
		return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
	};

	// Helper function to check if price is valid number
	const isValidPrice = (price) => {
		return price != null && !isNaN(Number(price)) && Number(price) > 0;
	};

	return (
		<>
			{status == "success" && (
				<div className="w-full h-full flex">        {/* flex ekn disply ek dekt bedno */}
					<div className="w-[50%]  h-full flex justify-center items-center">
						<ImageSlider images={product.images} />
					</div>
					<div className="w-[50%] flex justify-center items-center h-full">
                        <div className="w-[500px] h-[600px] flex flex-col  items-center">
                            <h1 className="w-full text-center text-4xl text-secondary font-semibold">{product.name}
                                {
                                    product.altNames && product.altNames.map((altName,index)=>{
                                        return(
                                            <span key={index} className="text-4xl text-gray-600 "> {" | "+altName}</span>       // product ekt thwth nmk dnn
                                        )
                                    })
                                }
                            </h1>
                            {/* product Id */}
                            <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
                            <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>      {/* product description ekt */}
                            {
                                isValidPrice(product.labelledPrice) && isValidPrice(product.price) && Number(product.labelledPrice) > Number(product.price) ?
                                <div>
                                    <span className="text-4xl mx-4 text-gray-500 line-through">{formatPrice(product.labelledPrice)}</span>     {/* boru gana , line-through ekn thmi gana kpnne*/}
                                    <span className="text-4xl mx-4 font-bold text-accent">{formatPrice(product.price)}</span>            {/* wikunana gana*/}
                                </div>
                                : isValidPrice(product.price) ?
                                <span className="text-4xl mx-4 font-bold text-accent">{formatPrice(product.price)}</span>
                                : <span className="text-4xl mx-4 font-bold text-accent">Price not available</span>
                            }
                            <div className="w-full flex justify-center items-center mt-4">
                                <button className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300" onClick={()=>{
                                    console.log("Old cart")
                                    console.log(getCart())
                                    addToCart(product,1)
                                    console.log("New cart")
                                    console.log(getCart())
                                }}>Add to Cart</button>
                                <button className="w-[200px] h-[50px] mx-4 cursor-pointer bg-accent text-white rounded-2xl hover:bg-accent/80 transition-all duration-300">Buy Now</button>
                            </div>
                        </div>
                        
                    </div>
				</div>
			)}
            {
                status == "loading" && <Loading/>
            }

		</>
	);
}