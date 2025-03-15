import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform lg:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <X className="lg:hidden cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>
        <ul>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Dashboard</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Users</li>
          <li className="p-2 hover:bg-gray-700 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-white p-4 shadow-md flex justify-between items-center">
          <Menu className="lg:hidden cursor-pointer" onClick={() => setIsOpen(true)} />
          <h2 className="text-lg font-bold">Dashboard</h2>
          <div className="flex gap-4">
            <span className="cursor-pointer">🔔</span>
            <span className="cursor-pointer">👤 Admin</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold">Welcome to the Dashboard</h3>
          <p className="text-gray-600">Here you can manage users, settings, and more.</p>
        </div>
      </div>
    </div>
  );
}
