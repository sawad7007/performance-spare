const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-sm">
              Your trusted source for high-quality car spare parts. We offer genuine and aftermarket parts for all car brands.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-400">Home</a></li>
              <li><a href="#" className="hover:text-gray-400">Shop</a></li>
              <li><a href="#" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-sm">📧 support@carparts.com</p>
            <p className="text-sm">📞 +1 234 567 890</p>
            <p className="text-sm">📍 123 Auto Street, Car City, USA</p>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400"> Facebook</a>
              <a href="#" className="hover:text-gray-400"> Instagram</a>
              <a href="#" className="hover:text-gray-400"> Twitter</a>
            </div>
          </div>
        </div>
  
        <hr className="border-gray-700 my-6" />
  
        <p className="text-center text-sm">&copy; 2025 CarParts.com | All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  