import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart.js"
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi"
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(getCart())
    const [removingItem, setRemovingItem] = useState(null)

    // Helper function to safely convert to number and format
    const formatPrice = (price) => {
        const numPrice = Number(price);
        return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
    };

    // Helper function to check if price is valid number
    const isValidPrice = (price) => {
        return price != null && !isNaN(Number(price)) && Number(price) > 0;
    };

    const handleRemoveItem = async (productId) => {
        setRemovingItem(productId);
        // Add slight delay for animation
        setTimeout(() => {
            removeFromCart(productId);
            setCart(getCart());
            setRemovingItem(null);
        }, 300);
    };

    const handleQuantityChange = (item, change) => {
        addToCart(item, change);
        setCart(getCart());
    };

    const calculateSavings = () => {
        return cart.reduce((total, item) => {
            if (isValidPrice(item.labelledPrice) && isValidPrice(item.price) && Number(item.labelledPrice) > Number(item.price)) {
                return total + (Number(item.labelledPrice) - Number(item.price)) * Number(item.qty);
            }
            return total;
        }, 0);
    };

    const totalItems = cart.reduce((total, item) => total + Number(item.qty), 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l1.1 5h9.8M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6M7 13L5.4 5M7 13l2.6 0" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">
                        Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
                    </p>
                    <Link 
                        to="/products" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
                        <p className="text-xl opacity-90">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Cart Items
                            </h2>
                            
                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <div
                                        key={item.productId}
                                        className={`bg-gray-50 rounded-2xl p-4 transition-all duration-300 ${
                                            removingItem === item.productId 
                                                ? 'opacity-50 scale-95 transform' 
                                                : 'opacity-100 scale-100 hover:shadow-md'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0 text-center md:text-left">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    ID: {item.productId}
                                                </p>
                                                
                                                {/* Price Display */}
                                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                                    {isValidPrice(item.labelledPrice) && isValidPrice(item.price) && Number(item.labelledPrice) > Number(item.price) ? (
                                                        <>
                                                            <span className="text-sm text-gray-400 line-through">
                                                                Rs. {formatPrice(item.labelledPrice)}
                                                            </span>
                                                            <span className="text-lg font-bold text-blue-600">
                                                                Rs. {formatPrice(item.price)}
                                                            </span>
                                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                                Save Rs. {formatPrice(Number(item.labelledPrice) - Number(item.price))}
                                                            </span>
                                                        </>
                                                    ) : isValidPrice(item.price) ? (
                                                        <span className="text-lg font-bold text-blue-600">
                                                            Rs. {formatPrice(item.price)}
                                                        </span>
                                                    ) : (
                                                        <span className="text-lg font-bold text-red-500">
                                                            Price unavailable
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center space-x-3 bg-white rounded-xl p-2 shadow-sm">
                                                <button
                                                    onClick={() => handleQuantityChange(item, -1)}
                                                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                                                    disabled={item.qty <= 1}
                                                >
                                                    <BiMinus className="text-gray-600" />
                                                </button>
                                                <span className="w-12 text-center font-semibold text-lg">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item, 1)}
                                                    className="w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                                                >
                                                    <BiPlus className="text-blue-600" />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-center md:text-right min-w-[120px]">
                                                <div className="text-xl font-bold text-gray-900">
                                                    Rs. {formatPrice(Number(item.price) * Number(item.qty))}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {item.qty} × Rs. {formatPrice(item.price)}
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => handleRemoveItem(item.productId)}
                                                disabled={removingItem === item.productId}
                                                className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                                                aria-label="Remove item"
                                            >
                                                <BiTrash className="text-xl group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Items ({totalItems})</span>
                                        <span>Rs. {formatPrice(getTotal())}</span>
                                    </div>
                                    
                                    {calculateSavings() > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>You Save</span>
                                            <span>- Rs. {formatPrice(calculateSavings())}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>Rs. {formatPrice(getTotal())}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link 
                                    to="/checkout" 
                                    state={{ cart: cart }}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Proceed to Checkout</span>
                                </Link>

                                {/* Continue Shopping */}
                                <Link 
                                    to="/products"
                                    className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl mb-1">🔒</div>
                                            <div className="text-xs text-gray-600">Secure Payment</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-1">🚚</div>
                                            <div className="text-xs text-gray-600">Free Shipping</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-1">↩️</div>
                                            <div className="text-xs text-gray-600">Easy Returns</div>
                                        </div>
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