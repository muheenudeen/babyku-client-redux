
import React, { useEffect, useState } from 'react';
import UserModal from '../componants/modal/UserModal';
import Admin from '../navbarAdmin/Admin';
import { toast } from 'react-hot-toast';
import api from '../../../../utis/axios';

const Userlist = () => {
  const [list, setList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetching the list of users
    api.get('/admin/users')
      .then((res) => {
        if (res.data.success) {
          setList(res.data.data);
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  
  const handleBlockUser = (userId) => {
    const user = list.find((user) => user._id === userId); 

    api.put(`/admin/users/${userId}`) 
      .then((res) => {
        if (res.data.success) {
          const updatedList = list.map((user) =>
            user._id === userId ? { ...user, isBlocked: res.data.newStatus } : user
          );
          setList(updatedList); 
          const action = res.data.newStatus ? 'blocked' : 'unblocked';
          toast.success(`User ${action} successfully!`);
        }
      })
      .catch((error) => {
        toast.error('Error updating user status');
        console.log(error);
      });
  };

  return (
    <>
      <Admin />
      <div className="p-4 w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-100">
              <th className="py-3 px-6 text-center text-gray-700 uppercase">ID</th>
              <th className="py-3 px-6 text-center text-gray-700 uppercase">Name</th>
              <th className="py-3 px-6 text-center text-gray-700 uppercase">Email</th>
              <th className="py-3 px-6 text-center text-gray-700 uppercase"></th>
              <th className="py-3 px-6 text-center text-gray-700 uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-300 hover:bg-gray-50 text-center">
                <td className="py-4 px-6">
                  <img
                    src="src/assets/download.jpeg"
                    alt=""
                    className="h-12 w-12 rounded-full mx-auto"
                  />
                </td>
                <td className="py-4 px-6 text-gray-800">{item.fname}</td>
                <td className="py-4 px-6 text-gray-800">{item.email}</td>
                <td className="py-4 px-6">
                  {/* Placeholder for orders */}
                </td>
                <td className="py-4 px-6 flex justify-center space-x-4">
                  <button
                    className="bg-yellow-500 text-white py-2 px-4 rounded-md font-semibold mr-20 hover:bg-yellow-600 text-center"
                    onClick={() => handleRowClick(item)}
                  >
                    View Order
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-red-600"
                    onClick={() => handleBlockUser(item._id)}
                  >
                    {item.isBlocked ? 'Block' : 'unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser && (
          <UserModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            user={selectedUser}
          />
        )}
      </div>
    </>
  );
};

export default Userlist;
