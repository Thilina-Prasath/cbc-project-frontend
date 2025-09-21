import { Link, useNavigate, useLocation } from "react-router-dom";
import UserData from "./userData";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function Header() {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close sidebar when route changes
    useEffect(() => {
        setSideDrawerOpened(false);
    }, [location]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (sideDrawerOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [sideDrawerOpened]);

    const navLinks = [
        { to: "/", label: "Home", icon: "🏠" },
        { to: "/products", label: "Products", icon: "🛍️" },
        { to: "/about", label: "About", icon: "ℹ️" },
        { to: "/reviews", label: "Reviews", icon: "⭐" },
        { to: "/search", label: "Search", icon: "🔍" }
    ];

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    console.log("Header component loading...");

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100' 
                    : 'bg-white shadow-lg'
            }`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setSideDrawerOpened(true)}
                            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors group"
                            aria-label="Open menu"
                        >
                            <GiHamburgerMenu className="text-2xl text-gray-700 group-hover:text-blue-600 transition-colors" />
                        </button>

                        {/* Logo */}
                        <div 
                            onClick={() => navigate("/")}
                            className="flex items-center cursor-pointer group"
                        >
                            <div className="relative">
                                <img 
                                    src="/logo.png" 
                                    alt="Logo" 
                                    className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>

                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 group ${
                                        isActiveLink(link.to)
                                            ? 'text-blue-600 bg-blue-50'
                                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <span className="hidden lg:inline mr-2">{link.icon}</span>
                                    {link.label}
                                    {isActiveLink(link.to) && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Cart & User Actions */}
                        <div className="flex items-center space-x-3">
                            <Link 
                                to="/cart" 
                                className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors group"
                                aria-label="Shopping cart"
                            >
                                <BsCart3 className="text-xl text-gray-700 group-hover:text-blue-600 transition-colors" />
                                
                            </Link>

                            
                        </div>
                    </div>
                </div>
            </header>

            {/* Add padding to body to account for fixed header */}
            <div className="h-20"></div>

            {/* Mobile Sidebar */}
            {sideDrawerOpened && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSideDrawerOpened(false)}
                    />
                    
                    {/* Sidebar */}
                    <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out">
                        {/* Sidebar Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <div className="flex items-center justify-between">
                                <div 
                                    onClick={() => {
                                        navigate("/");
                                        setSideDrawerOpened(false);
                                    }}
                                    className="flex items-center cursor-pointer group"
                                >
                                    <img 
                                        src="/logo.png" 
                                        alt="Logo" 
                                        className="w-12 h-12 object-cover rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all"
                                    />
                                </div>
                                
                                <button
                                    onClick={() => setSideDrawerOpened(false)}
                                    className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Sidebar Navigation */}
                        <div className="p-6">
                            <nav className="space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setSideDrawerOpened(false)}
                                        className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                            isActiveLink(link.to)
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                        }`}
                                    >
                                        <span className="text-2xl mr-4">{link.icon}</span>
                                        <span className="text-lg">{link.label}</span>
                                        {isActiveLink(link.to) && (
                                            <div className="ml-auto">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        )}
                                    </Link>
                                ))}
                                
                                {/* Cart Link */}
                                <Link
                                    to="/cart"
                                    onClick={() => setSideDrawerOpened(false)}
                                    className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                                        isActiveLink('/cart')
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                                    }`}
                                >
                                    <div className="relative mr-4">
                                        <BsCart3 className="text-2xl" />
                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            3
                                        </div>
                                    </div>
                                    <span className="text-lg">Shopping Cart</span>
                                </Link>
                            </nav>

                            {/* User Section in Mobile removed */}

                            {/* Footer Links */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🚚</div>
                                        <div className="text-xs text-gray-600 font-medium">Free Shipping</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🔒</div>
                                        <div className="text-xs text-gray-600 font-medium">Secure</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">⭐</div>
                                        <div className="text-xs text-gray-600 font-medium">Top Rated</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @media (max-width: 768px) {
                    .sidebar-enter {
                        transform: translateX(-100%);
                    }
                    .sidebar-enter-active {
                        transform: translateX(0);
                        transition: transform 300ms ease-out;
                    }
                    .sidebar-exit {
                        transform: translateX(0);
                    }
                    .sidebar-exit-active {
                        transform: translateX(-100%);
                        transition: transform 300ms ease-in;
                    }
                }
            `}</style>
        </>
    );
}