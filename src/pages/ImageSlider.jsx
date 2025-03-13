import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ImageSlider() {
    const images = [
        "https://api.maz-performance.com/web/image/product.brand/26/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/33/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/48/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/18/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/9/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/7/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/3/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/4/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/6/brand_image",
        "https://api.maz-performance.com/web/image/product.brand/14/brand_image"
    ];

    return (
        <div className="max-w-8xl mx-auto p-7">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                autoplay={{
                    delay: 0.5,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true 
                }}
                speed={4000}  
                spaceBetween={20}
                slidesPerView={3}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 }
                }}
                className="rounded-lg shadow-lg"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="h-[17vh] bg-cover bg-center rounded-lg"
                            style={{ backgroundImage: `url('${image}')` }}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
