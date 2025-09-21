import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [filterBy, setFilterBy] = useState("all");
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter and sort products
    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.altNames?.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Apply category filter (if you have categories)
        if (filterBy !== "all") {
            filtered = filtered.filter(product => product.category === filterBy);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price-low":
                    return (Number(a.price) || 0) - (Number(b.price) || 0);
                case "price-high":
                    return (Number(b.price) || 0) - (Number(a.price) || 0);
                case "newest":
                    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                default:
                    return 0;
            }
        });

        return filtered;
    }, [products, searchQuery, filterBy, sortBy]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterBy, sortBy]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Our Products
                        </h1>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            Discover amazing products crafted with care and attention to detail
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters and Controls */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center space-x-4">
                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="name">Sort by Name</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === "grid"
                                            ? "bg-white shadow-sm text-blue-600"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded-md transition-all ${
                                        viewMode === "list"
                                            ? "bg-white shadow-sm text-blue-600"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Summary */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, filteredAndSortedProducts.length)} of {filteredAndSortedProducts.length} products
                        </div>
                        {searchQuery && (
                            <div className="text-sm text-gray-600">
                                Search results for: <span className="font-semibold text-gray-900">"{searchQuery}"</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600 font-medium">Loading amazing products...</p>
                        </div>
                    </div>
                ) : currentProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                No Products Found
                            </h2>
                            <p className="text-gray-600 mb-8">
                                {searchQuery ? 
                                    `We couldn't find any products matching "${searchQuery}". Try different keywords.` :
                                    "No products are available at the moment. Check back later!"
                                }
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
                                >
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <div className={
                            viewMode === "grid" 
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 lg:gap-10"
                                : "space-y-8"
                        }>
                            {currentProducts.map((product, index) => (
                                <div
                                    key={product.productId}
                                    className="opacity-0 animate-fadeInUp"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                        animationFillMode: 'forwards'
                                    }}
                                >
                                    <ProductCard product={product} viewMode={viewMode} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-12 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    const isCurrentPage = pageNumber === currentPage;
                                    
                                    // Show only a range of pages
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                    isCurrentPage
                                                        ? "bg-blue-600 text-white"
                                                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 3 ||
                                        pageNumber === currentPage + 3
                                    ) {
                                        return <span key={pageNumber} className="text-gray-400">...</span>;
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
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