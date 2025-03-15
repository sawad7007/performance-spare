import { Routes, Route, Link } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/admin" className="flex items-center space-x-2 hover:text-gray-400">
              <LayoutDashboard /> <span>Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/products" className="flex items-center space-x-2 hover:text-gray-400">
              <Package /> <span>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="flex items-center space-x-2 hover:text-gray-400">
              <ShoppingCart /> <span>Manage Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Dashboard = () => <div className="p-5 text-xl">Welcome to Admin Dashboard</div>;
const ManageProducts = () => <div className="p-5 text-xl">Manage Products Page</div>;
const ManageOrders = () => <div className="p-5 text-xl">Manage Orders Page</div>;

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Routes>
          <Route path="/dashbord" element={<Dashboard />} />
          <Route path="/products" element={<ManageProducts />} />
          <Route path="/orders" element={<ManageOrders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
