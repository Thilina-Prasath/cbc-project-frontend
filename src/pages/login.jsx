import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { GrGoogle } from "react-icons/gr"
import { useNavigate, Link } from "react-router-dom"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {}
        
        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email"
        }
        
        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            setIsGoogleLoading(true)
            try {
                const accessToken = response.access_token
                const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
                    accessToken: accessToken
                })
                
                toast.success("Login Successful!")
                const token = res.data.token
                localStorage.setItem("token", token)
                
                if (res.data.role === "admin") {
                    navigate("/admin/")
                } else {
                    navigate("/")
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Google login failed")
            } finally {
                setIsGoogleLoading(false)
            }
        },
        onError: () => {
            toast.error("Google login failed")
            setIsGoogleLoading(false)
        }
    })

    async function handleLogin() {
        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
                email: email,
                password: password
            })

            toast.success("Login successful!")
            console.log(response.data)
            localStorage.setItem("token", response.data.token)

            if (response.data.role?.startsWith("admin")) {
                navigate("/admin/")
            } else {
                navigate("/")
            }

        } catch (e) {
            toast.error(e.response?.data?.message || "Login failed")
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20">
                    <div className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full px-4 py-3 pl-12 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.email 
                                            ? 'border-red-300 focus:ring-red-200' 
                                            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter your email"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className={`w-full px-4 py-3 pl-12 pr-12 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                                        errors.password 
                                            ? 'border-red-300 focus:ring-red-200' 
                                            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
                                    }`}
                                    placeholder="Enter your password"
                                />
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <button
                            onClick={googleLogin}
                            disabled={isGoogleLoading}
                            className={`w-full py-4 rounded-2xl font-semibold border-2 transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-3 ${
                                isGoogleLoading
                                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                    : 'border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400'
                            }`}
                        >
                            {isGoogleLoading ? (
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <GrGoogle className="text-xl text-red-500" />
                            )}
                            <span className="text-gray-700 text-lg">
                                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
                            </span>
                        </button>

                        {/* Sign Up Link */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link 
                                    to="/signup" 
                                    className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    )
}