import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in as admin");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/reviews",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        console.log("Reviews fetched:", response.data); // Debug log
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        toast.error(err.response?.data?.message || "Failed to fetch reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-4 bg-white shadow rounded border"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{review.name}</h2>
                <span className="text-yellow-500">⭐ {review.rating}</span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
