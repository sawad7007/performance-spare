import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0 });
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    // Fetch Sales Data
    fetch("http://localhost:3004/sales")
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error("Error fetching sales data:", error));

    // Fetch Overall Stats
    fetch("http://localhost:3004/stats")
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStats({ totalSales: data[0].totalSales, totalOrders: data[0].totalOrders });
        }
      })
      .catch(error => console.error("Error fetching stats:", error));

    // Fetch Users Data
    fetch("http://localhost:3004/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li><Link to="/admin/products" className="hover:text-gray-400">Manage Products</Link></li>
          <li><Link to="/admin/users" className="hover:text-gray-400">Manage Users</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="text-3xl font-bold mb-4">Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Sales</h3>
            <p className="text-2xl">${stats.totalSales}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl">{stats.totalOrders}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-md shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl">{users.length}</p> {/* Dynamically updated */}
          </div>
        </div>

        {/* Sales Chart */}
        <div className="mt-6 bg-white p-6 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
