import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders?.orderList || []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md p-4 rounded-lg">
              <p className="text-lg font-medium">Order ID: {order.id}</p>
              <p className="text-lg">Total: ₹{order.total}</p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
