import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state?.cart);

    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errors, setErrors] = useState({});

    // Redirect if no cart items
    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">No Items to Checkout</h2>
                    <p className="text-gray-600 mb-8">
                        Your cart is empty. Please add some items before proceeding to checkout.
                    </p>
                    <Link 
                        to="/products" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    function formatPrice(price) {
        return Number(price).toFixed(2);
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(index);
            return;
        } else {
            const newCart = [...cart];
            newCart[index].qty = newQty;
            setCart(newCart);
        }
    }

    function validateForm() {
        const newErrors = {};
        
        if (!fullName.trim()) newErrors.fullName = "Full name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
        if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ''))) newErrors.phoneNumber = "Phone number should be 10 digits";
        if (!address.trim()) newErrors.address = "Address is required";
        if (!city.trim()) newErrors.city = "City is required";
        if (!postalCode.trim()) newErrors.postalCode = "Postal code is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function placeOrder() {
        if (!validateForm()) {
            toast.error("Please fill in all required fields correctly");
            return;
        }

        setIsPlacingOrder(true);

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to place order");
            setIsPlacingOrder(false);
            return;
        }

        const orderInformation = {
            products: cart.map(item => ({
                productId: item.productId,
                qty: item.qty,
            })),
            customerInfo: {
                fullName,
                email,
                phone: phoneNumber,
                address,
                city,
                postalCode,
            }
        };

        try {
            const res = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders",
                orderInformation,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            toast.success("Order placed successfully!");
            console.log(res.data);
            
            // Clear form and redirect
            setCart([]);
            setTimeout(() => {
                navigate("/products");
            }, 2000);
            
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Error placing order");
        } finally {
            setIsPlacingOrder(false);
        }
    }

    const totalItems = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Secure Checkout</h1>
                        <p className="text-xl opacity-90">
                            Review your order and complete your purchase
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Customer Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                            errors.fullName 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                            errors.email 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                            errors.phoneNumber 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phoneNumber && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                            errors.city 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter your city"
                                    />
                                    {errors.city && (
                                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        rows="3"
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                                            errors.address 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter your full address"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Postal Code *
                                    </label>
                                    <input
                                        type="text"
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                                            errors.postalCode 
                                                ? 'border-red-300 focus:ring-red-200' 
                                                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                        }`}
                                        placeholder="Enter postal code"
                                    />
                                    {errors.postalCode && (
                                        <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Order Items ({totalItems})
                            </h2>
                            
                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <div key={item.productId} className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">ID: {item.productId}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {item.labelledPrice && Number(item.labelledPrice) > Number(item.price) ? (
                                                    <>
                                                        <span className="text-sm text-gray-400 line-through">
                                                            Rs. {formatPrice(item.labelledPrice)}
                                                        </span>
                                                        <span className="text-lg font-bold text-blue-600">
                                                            Rs. {formatPrice(item.price)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-lg font-bold text-blue-600">
                                                        Rs. {formatPrice(item.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => changeQty(index, -1)}
                                                className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                                            >
                                                <BiMinus />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.qty}</span>
                                            <button
                                                onClick={() => changeQty(index, 1)}
                                                className="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
                                            >
                                                <BiPlus />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <div className="font-bold text-gray-900">
                                                Rs. {formatPrice(item.price * item.qty)}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <BiTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({totalItems} items)</span>
                                        <span>Rs. {formatPrice(getTotal())}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>Rs. 0.00</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between text-2xl font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>Rs. {formatPrice(getTotal())}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={placeOrder}
                                    disabled={isPlacingOrder}
                                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                                        isPlacingOrder
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                                    }`}
                                >
                                    {isPlacingOrder ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span>Place Order</span>
                                        </>
                                    )}
                                </button>

                                {/* Security Badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl mb-1">🔒</div>
                                            <div className="text-xs text-gray-600">Secure Payment</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-1">🚚</div>
                                            <div className="text-xs text-gray-600">Free Delivery</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl mb-1">↩️</div>
                                            <div className="text-xs text-gray-600">Easy Returns</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back to Cart */}
                                <Link 
                                    to="/cart"
                                    className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Back to Cart</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}