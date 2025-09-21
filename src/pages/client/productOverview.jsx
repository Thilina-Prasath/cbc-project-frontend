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
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);
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

    const calculateDiscount = () => {
        if (isValidPrice(product.labelledPrice) && isValidPrice(product.price)) {
            const discount = ((Number(product.labelledPrice) - Number(product.price)) / Number(product.labelledPrice)) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
            addToCart(product, quantity);
            toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleBuyNow = () => {
        navigate("/checkout", {
            state: {
                cart: [
                    {
                        productId: product.productId,
                        name: product.name,
                        image: product.images[0],
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        qty: quantity,
                    },
                ],
            },
        });
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Breadcrumb */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600">
                        <button onClick={() => navigate("/")} className="hover:text-blue-600 transition-colors">
                            Home
                        </button>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <button onClick={() => navigate("/products")} className="hover:text-blue-600 transition-colors">
                            Products
                        </button>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium truncate">{product?.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12">
                            <div className="sticky top-8">
                                <div className="relative">
                                    <ImageSlider images={product.images} />
                                    
                                    {calculateDiscount() > 0 && (
                                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                            -{calculateDiscount()}% OFF
                                        </div>
                                    )}

                                    <button className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform group">
                                        <svg className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {product.images && product.images.length > 1 && (
                                    <div className="flex space-x-2 mt-6 overflow-x-auto">
                                        {product.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImage(index)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                    selectedImage === index
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 lg:p-12">
                            <div className="max-w-lg">
                                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    ID: {product.productId}
                                </div>

                                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {product.name}
                                </h1>

                                {product.altNames && product.altNames.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {product.altNames.map((altName, index) => (
                                            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {altName}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="ml-2 text-gray-600">4.8 (124 reviews)</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                    <span className="text-green-600 font-medium">✓ In Stock</span>
                                </div>

                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    {isValidPrice(product.labelledPrice) && isValidPrice(product.price) && Number(product.labelledPrice) > Number(product.price) ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-2xl text-gray-400 line-through">
                                                    Rs. {formatPrice(product.labelledPrice)}
                                                </span>
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                                                    -{calculateDiscount()}%
                                                </span>
                                            </div>
                                            <div className="text-4xl font-bold text-blue-600">
                                                Rs. {formatPrice(product.price)}
                                            </div>
                                            <div className="text-green-600 font-medium">
                                                💰 You save Rs. {formatPrice(Number(product.labelledPrice) - Number(product.price))}
                                            </div>
                                        </div>
                                    ) : isValidPrice(product.price) ? (
                                        <div className="text-4xl font-bold text-blue-600">
                                            Rs. {formatPrice(product.price)}
                                        </div>
                                    ) : (
                                        <div className="text-2xl font-bold text-red-500">
                                            Price not available
                                        </div>
                                    )}
                                </div>

                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                                    <div className="flex items-center space-x-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
                                    >
                                        {addingToCart ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Adding...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.1 5h9.8M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M7 13L5.4 5M7 13l2.6 0" />
                                                </svg>
                                                <span>Add to Cart</span>
                                            </div>
                                        )}
                                    </button>
                                    
                                    <button
                                        onClick={handleBuyNow}
                                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>Buy Now</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🚚</div>
                                        <div className="text-xs text-gray-600 font-medium">Free Delivery</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🔒</div>
                                        <div className="text-xs text-gray-600 font-medium">Secure Payment</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">↩️</div>
                                        <div className="text-xs text-gray-600 font-medium">Easy Returns</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}