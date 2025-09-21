import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../../components/loading";

export default function AdminUserPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/users/customers",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          setCustomers([]);
          toast.error("Unexpected data format from server");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error(
          error.response?.data?.message || "Failed to load customers"
        );
        setCustomers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Delete a customer
  const deleteCustomer = async (userId) => {
    if (!userId) {
      toast.error("Invalid user ID");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId,
        { headers: { Authorization: "Bearer " + token } }
      );

      toast.success("Customer deleted successfully");
      setCustomers(customers.filter((c) => c._id !== userId));
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error(error.response?.data?.message || "Failed to delete customer");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-4 font-[var(--font-main)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Customer Management</h1>
        <p className="text-gray-600">Total Customers: {customers.length}</p>
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No customers found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-center border border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[var(--color-accent)] text-white">
              <tr>
                <th className="py-3 px-2">User ID</th>
                <th className="py-3 px-2">Email</th>
                <th className="py-3 px-2">First Name</th>
                <th className="py-3 px-2">Last Name</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr
                  key={customer._id || `customer-${index}`}
                  className={`${
                    index % 2 === 0 ? "bg-[var(--color-primary)]" : "bg-gray-100"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="py-2 px-2 font-mono text-sm">
                    {customer._id?.slice(-8) || "N/A"}
                  </td>
                  <td className="py-2 px-2">{customer.email || "N/A"}</td>
                  <td className="py-2 px-2">{customer.firstName || "N/A"}</td>
                  <td className="py-2 px-2">{customer.lastName || "N/A"}</td>
                  <td className="py-2 px-2">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => deleteCustomer(customer._id)}
                        className="text-red-500 hover:text-red-700 transition p-1 rounded hover:bg-red-50"
                        title="Delete Customer"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
