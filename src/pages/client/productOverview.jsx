import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import Loading from "../../components/loading";
import { addToCart } from "../../utils/cart";

export default function ProductOverviewPage() {
	const params = useParams();
	const productId = params.id;
	const [status, setStatus] = useState("loading");
	const [product, setProduct] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
			.then((response) => {
				console.log(response.data);
				setProduct(response.data);
				setStatus("success");
			})
			.catch((error) => {
				console.log(error);
				setStatus("error");
				toast.error("Error fetching product details");
			});
	}, [productId]);

	const formatPrice = (price) => {
		const numPrice = Number(price);
		return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
	};

	const isValidPrice = (price) => {
		return price != null && !isNaN(Number(price)) && Number(price) > 0;
	};

	return (
		<>
			{status === "success" && (
				<div className="w-full min-h-screen bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 py-8">
						<div className="flex flex-col lg:flex-row gap-8">
							{/* Mobile Title */}
							<h1 className="md:hidden text-center text-2xl font-bold text-gray-800 mb-6">
								{product.name}
								{product.altNames?.map((altName, index) => (
									<span key={index} className="text-xl text-gray-600 font-normal"> | {altName}</span>
								))}
							</h1>

							{/* Image Section */}
							<div className="w-full md:w-1/2 flex justify-center">
								<div className="w-full max-w-md">
									<ImageSlider images={product.images} />
								</div>
							</div>

							{/* Info Section */}
							<div className="w-full md:w-1/2 flex flex-col justify-center px-4 lg:px-8">
								{/* Desktop Title */}
								<div className="hidden lg:block mb-6">
									<h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
										{product.name}
									</h1>
									{product.altNames && product.altNames.length > 0 && (
										<div className="text-lg text-gray-600">
											{product.altNames.join(" | ")}
										</div>
									)}
								</div>

								{/* Product ID */}
								<p className="text-gray-700   text-center md:text-left py-16">
									ID: {product.productId}
								</p>

								{/* Description */}
								<p className="text-gray-700  text-center md:text-left ">
									{product.description}
								</p>

								{/* Pricing */}
								<div className="mb-8 text-center lg:text-left">
									{isValidPrice(product.labelledPrice) && isValidPrice(product.price) && Number(product.labelledPrice) > Number(product.price) ? (
										<div className="space-y-2">
											<div className="text-lg text-gray-500 line-through">
												Rs. {formatPrice(product.labelledPrice)}
											</div>
											<div className="text-4xl font-bold text-purple-600">
												Rs. {formatPrice(product.price)}
											</div>
											<div className="text-sm text-green-600 font-medium">
												Save Rs. {formatPrice(Number(product.labelledPrice) - Number(product.price))}
											</div>
										</div>
									) : isValidPrice(product.price) ? (
										<div className="text-4xl font-bold text-purple-600">
											Rs. {formatPrice(product.price)}
										</div>
									) : (
										<div className="text-2xl font-bold text-red-500">
											Price not available
										</div>
									)}
								</div>

								{/* Buttons */}
								<div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
									<button
										className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
										onClick={() => {
											addToCart(product, 1);
											toast.success("Added to cart!");
										}}
									>
										Add to Cart
									</button>
									<button
										className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md hover:shadow-lg"
										onClick={() => {
											navigate("/checkout", {
												state: {
													cart: [
														{
															productId: product.productId,
															name: product.name,
															image: product.images[0],
															price: product.price,
															labelledPrice: product.labelledPrice,
															qty: 1,
														},
													],
												},
											});
										}}
									>
										Buy Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{status === "loading" && <Loading />}
		</>
	);
}