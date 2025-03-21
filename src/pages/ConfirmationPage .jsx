import { Link, useLocation } from "react-router-dom";

const ConfirmationPage = () => {
    const location = useLocation();
    const orderedItems = location.state?.orderedItems || [];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h2>
                <p className="text-lg text-gray-700">Thank you for your order. We will process it shortly.</p>

                <div className="mt-6 text-left">
                    <h3 className="font-bold text-xl">Ordered Items:</h3>
                    <ul className="mt-2">
                        {orderedItems.map((item, index) => (
                            <li key={index} className="text-gray-700">{item.name} - ${item.price} x {item.quantity}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <Link to="/" className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
        
    );
};

export default ConfirmationPage;
