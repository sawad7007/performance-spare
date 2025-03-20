import React, { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users
  const fetchUsers = () => {
    fetch("http://localhost:3004/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Delete User Function
  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3004/users/${id}`, { method: "DELETE" });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Users</h2>
      <p className="text-lg font-semibold text-gray-700 mb-4">Total Users: {users.length}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">ID</th>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center border-b">
                  <td className="border p-3">{user.id}</td>
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.role}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;