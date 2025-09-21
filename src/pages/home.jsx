import { Route, Routes, Link } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import SearchProductPage from "./client/searchProducts";
import UserReview from "./client/userReview";

function BeautifulAboutPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <section className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Company</h1>
                    <p className="text-xl max-w-3xl mx-auto opacity-90">
                        We're passionate about delivering exceptional products and creating meaningful experiences for our customers worldwide.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-6">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                                Our Journey
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Story</span>
                            </h2>
                            
                            <div className="space-y-6 mb-10">
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Founded in <span className="font-semibold text-blue-600">2025</span>, we started with a simple yet powerful vision: to make high-quality products accessible to everyone. What began as a small startup in a garage has grown into a trusted brand serving thousands of customers globally.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our commitment to <span className="font-semibold text-purple-600">innovation</span>, <span className="font-semibold text-blue-600">quality</span>, and <span className="font-semibold text-indigo-600">customer satisfaction</span> drives everything we do. We believe in building lasting relationships and creating products that truly make a difference in people's lives.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">50K+</div>
                                            <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
                                        </div>
                                        <div className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                            😊
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">1000+</div>
                                            <div className="text-sm text-gray-600 font-medium">Products Sold</div>
                                        </div>
                                        <div className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                            📦
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">99%</div>
                                            <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                                        </div>
                                        <div className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                            ⭐
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                                            <div className="text-sm text-gray-600 font-medium">Support Available</div>
                                        </div>
                                        <div className="text-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                            🕒
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-20 transform rotate-6"></div>
                                
                                <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
                                        <div className="text-6xl mb-4">🚀</div>
                                        <h3 className="text-2xl font-bold mb-4">Innovation Driven</h3>
                                        <p className="text-blue-100">
                                            From startup to success - powered by passion and dedication
                                        </p>
                                        
                                        <div className="flex justify-center items-center mt-8 space-x-4">
                                            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                                            <div className="w-4 h-4 bg-white rounded-full"></div>
                                            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-bounce">
                                    ✨
                                </div>
                                
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg animate-pulse">
                                    💡
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            These core principles guide our decisions and shape our company culture
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Customer First</h3>
                            <p className="text-gray-600">
                                We prioritize our customers' needs and strive to exceed expectations in every interaction.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Innovation</h3>
                            <p className="text-gray-600">
                                We continuously seek new ways to improve our products and services through creative thinking.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-900">Quality</h3>
                            <p className="text-gray-600">
                                We maintain the highest standards in everything we do, from product design to customer service.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            

            <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
                    <p className="text-xl mb-8 opacity-90 leading-relaxed">
                        "To empower people through innovative products that enhance their daily lives while building a sustainable future for generations to come."
                    </p>
                    
                </div>
            </section>
        </div>
    );
}

function BeautifulHomePage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                            Welcome to Our Store
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                            Discover amazing products that will transform your lifestyle. Quality, innovation, and style combined.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/products" 
                                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Shop Now
                            </Link>
                            <Link 
                                to="/about" 
                                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We provide exceptional service and quality products that exceed expectations
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast Delivery</h3>
                            <p className="text-gray-600">Quick and reliable shipping to your doorstep with real-time tracking</p>
                        </div>
                        
                        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Guaranteed</h3>
                            <p className="text-gray-600">Premium products with warranty and satisfaction guarantee</p>
                        </div>
                        
                        <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.196l-1.287 3.236a4 4 0 01-2.24 2.24L5.196 12l3.277 4.327a4 4 0 012.24 2.24L12 21.804l1.287-3.236a4 4 0 012.24-2.24L18.804 12l-3.277-4.327a4 4 0 01-2.24-2.24L12 2.196z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-900">24/7 Support</h3>
                            <p className="text-gray-600">Round-the-clock customer service for all your needs</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                            <div className="text-gray-300">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
                            <div className="text-gray-300">Products</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
                            <div className="text-gray-300">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                            <div className="text-gray-300">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            
        </div>
    );
}

export default function HomePage() {
    return (
        <div className="w-full min-h-screen flex flex-col items-center">
            <Header />
            <div className="w-full flex-1">
                <Routes path="/*">
                    <Route path="/" element={<BeautifulHomePage />} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/about" element={<BeautifulAboutPage />} />
                    <Route path="/contact" element={<h1 className="text-3xl font-bold text-center py-20">Contact Us</h1>} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/search" element={<SearchProductPage />} />
                    <Route path="/overview/:id" element={<ProductOverviewPage />} />
                    <Route path="/reviews" element={<UserReview />} />
                    <Route path="/*" element={<h1 className="text-3xl font-bold text-center py-20 text-red-600">404 Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}