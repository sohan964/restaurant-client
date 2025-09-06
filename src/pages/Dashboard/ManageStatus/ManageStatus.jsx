import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const statusOptions = ["pending", "preparing", "delivered", "cancel"];

const ManageStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orderList = [], refetch } = useQuery({
    queryKey: ["orderList", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order-status`);
      return res.data;
    },
  });

  // Optional: To show loading state for each row
  const [loadingId, setLoadingId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingId(orderId);

    console.log("BAL",orderId, newStatus);
    try {
      await axiosSecure.patch(`/order-status/${orderId}`, { status: newStatus });
      refetch();
    } catch (error) {
      // Optionally handle error
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Price</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Address</th>
            
            <th>Menu Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order._id}>
              <td>{order.email}</td>
              <td>${Number(order.price).toFixed(2)}</td>
              <td>{order.transactionId}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.address}</td>
              <td>
                <ul className="menu menu-xs bg-base-200 rounded-box">
                  {order.menuItemIds.map((id) => (
                    <li key={id}>
                      <Link
                        to={`/menu/${id}`}
                        className="link link-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {id}
                      </Link>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <select
                  className="select select-bordered select-sm"
                  value={order.status}
                  disabled={loadingId === order._id}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                {loadingId === order._id && (
                  <span className="loading loading-spinner loading-xs ml-2"></span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStatus;