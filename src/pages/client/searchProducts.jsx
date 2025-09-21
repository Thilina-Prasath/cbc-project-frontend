import axios from "axios";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchTimeoutRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem("searchHistory");
        if (savedHistory) {
            setSearchHistory(JSON.parse(savedHistory));
        }
    }, []);

    const performSearch = async (searchQuery) => {
        if (searchQuery.length === 0) {
            setProducts([]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                import.meta.env.VITE_BACKEND_URL +
                "/api/products/search/" +
                searchQuery
            );
            setProducts(response.data);
            
            if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
                const newHistory = [searchQuery.trim(), ...searchHistory.slice(0, 4)];
                setSearchHistory(newHistory);
                localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            }
        } catch (error) {
            toast.error("Error fetching products");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setIsLoading(true);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            performSearch(value);
        }, 500);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setIsLoading(true);
        performSearch(suggestion);
    };

    const clearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem("searchHistory");
    };

    const getResultsText = () => {
        if (query.length === 0) return "";
        if (isLoading) return "Searching...";
        if (products.length === 0) return "No products found";
        return `${products.length} product${products.length !== 1 ? 's' : ''} found`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find Your Perfect Product
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Search through thousands of products to find exactly what you're looking for
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="relative mb-6">
                        <div className="relative">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search for products... (e.g., laptop, shoes, books)"
                                className="w-full h-16 pl-16 pr-12 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                value={query}
                                onChange={handleSearchChange}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            {query && (
                                <button
                                    onClick={() => {
                                        setQuery("");
                                        setProducts([]);
                                        inputRef.current?.focus();
                                    }}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {showSuggestions && searchHistory.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-20">
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
                                        <button
                                            onClick={clearHistory}
                                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    {searchHistory.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 text-sm flex items-center space-x-3 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{suggestion}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {query && (
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600 font-medium">{getResultsText()}</span>
                                {query && !isLoading && (
                                    <span className="text-gray-400">for</span>
                                )}
                                {query && !isLoading && (
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                        "{query}"
                                    </span>
                                )}
                            </div>
                            {products.length > 0 && (
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Fast results</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {query.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Start Your Search Journey
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Enter a product name or keyword above to discover amazing products tailored for you
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {["Laptops", "Smartphones", "Books", "Fashion", "Home"].map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <Loading />
                            </div>
                        ) : (
                            <>
                                {products.length === 0 ? (
                                    <div className="text-center py-20">
                                        <div className="max-w-md mx-auto">
                                            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.448M15 6.306v.306M9 6.306v.306" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                                No Products Found
                                            </h2>
                                            <p className="text-gray-600 mb-8">
                                                We couldn't find any products matching "<span className="font-semibold text-gray-900">{query}</span>". Try different keywords or browse our categories.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setQuery("");
                                                    inputRef.current?.focus();
                                                }}
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                                            >
                                                Try New Search
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {products.map((product, index) => (
                                            <div
                                                key={product.productId}
                                                className="opacity-0 animate-fadeInUp"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                    animationFillMode: 'forwards'
                                                }}
                                            >
                                                <ProductCard product={product} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}