import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <p className="text-lg font-medium">Name: {user?.name}</p>
        <p className="text-lg">Email: {user?.email}</p>
        <button 
          onClick={() => navigate("/orders")}
          className="mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;
