import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserReview() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem("token");
      
      console.log("Token from localStorage:", token);
      console.log("Token exists:", !!token);
      console.log("Authorization header will be:", `Bearer ${token}`);
      
      if (!token) {
        toast.error("Please login first");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { rating: Number(rating), comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Response:", response.data);
      toast.success("Review submitted successfully!");
      setRating(5);
      setComment("");
      
    } catch (err) {
      console.error("Error submitting review:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 401) {
        toast.error("Please login first");
      } else {
        toast.error(err.response?.data?.message || "Failed to submit review");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          className={`text-4xl transition-all duration-200 transform hover:scale-110 focus:outline-none ${
            starValue <= (hoveredStar || rating)
              ? 'text-yellow-400 drop-shadow-lg'
              : 'text-gray-300 hover:text-yellow-200'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ⭐
        </button>
      );
    });
  };

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Poor 😞",
      2: "Fair 😐",
      3: "Good 🙂",
      4: "Very Good 😊",
      5: "Excellent 🤩"
    };
    return labels[rating] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Experience</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Your feedback helps us improve and helps other customers make better decisions
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-100 to-pink-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-10">
              <label className="block text-xl font-semibold text-gray-900 mb-6">
                How would you rate your experience?
              </label>
              
              <div className="flex flex-col items-center">
                <div className="flex space-x-2 mb-4">
                  {renderStars()}
                </div>
                
                <div className="text-lg font-medium text-gray-700 mb-2">
                  {getRatingLabel(hoveredStar || rating)}
                </div>
                
                <div className="text-sm text-gray-500">
                  {hoveredStar || rating} out of 5 stars
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xl font-semibold text-gray-900 mb-4">
                Tell us more about your experience
              </label>
              
              <div className="relative">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full min-h-[150px] p-6 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400"
                  placeholder="Share your thoughts, what you liked, areas for improvement..."
                  required
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {comment.length}/500
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !comment.trim()}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
                  isSubmitting || !comment.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Submit Review</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setRating(5);
                  setComment("");
                }}
                className="px-6 py-4 rounded-2xl font-medium text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure & Private</h3>
            <p className="text-sm text-gray-600">Your data is protected and never shared</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-1">Quick & Easy</h3>
            <p className="text-sm text-gray-600">Submit your review in under a minute</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="text-3xl mb-2">💝</div>
            <h3 className="font-semibold text-gray-900 mb-1">Valued Feedback</h3>
            <p className="text-sm text-gray-600">Every review helps us improve</p>
          </div>
        </div>
      </div>
    </div>
  );
}