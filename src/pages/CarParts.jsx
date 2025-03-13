import { useNavigate } from 'react-router-dom';

export default function CarParts() {
    const navigate = useNavigate();

    const items = [
        { image: "https://wheelhaven.com/cdn/shop/files/rays_volk_racing_te37_ultra_mspec_gold_wheel_haven.jpg?v=1734022303", text: "Wheels", path: "/wheels" },
        { image: "https://cdn11.bigcommerce.com/s-fh9wsjv2/images/stencil/1280x1280/products/6348/47693/G87_M2_Valvetronic_Studio_Photo_3__00191.1708617788.jpg?c=2", text: "Exhaust", path: "/exhaust-systems" },
        { image: "https://media.istockphoto.com/id/1319822436/photo/automobile-turbo-turbocharger-car-auto-part.jpg?s=612x612&w=0&k=20&c=WnNgUIQY3pHZimxtU6SYjmSuDS2cJFhIy9fkLNRzxOQ=", text: "Turbocharger", path: "/turbocharger" },
        { image: "https://www.shutterstock.com/image-illustration/vector-design-intro-nos-this-260nw-2485245513.jpg", text: "Nitrous Oxide Systems", path: "/nos" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className="relative h-[40vh] bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url('${item.image}')` }}>
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-md text-sm">
                        {item.text}
                    </div>
                    <button
                        onClick={() => navigate(item.path)}
                        className="absolute bottom-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                        View More
                    </button>
                </div>
            ))}
        </div>
    );
}
