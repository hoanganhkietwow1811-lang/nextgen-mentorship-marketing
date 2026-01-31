'use client'

import { motion } from "framer-motion";
import { FaGoogle, FaAmazon, FaMicrosoft, FaApple, FaSpotify, FaUber, FaAirbnb, FaPaypal } from "react-icons/fa";
import { SiNetflix, SiMeta, SiTesla, SiSamsung } from "react-icons/si";

const brands = [
  { name: "Google", icon: FaGoogle },
  { name: "Meta", icon: SiMeta },
  { name: "Amazon", icon: FaAmazon },
  { name: "Microsoft", icon: FaMicrosoft },
  { name: "Netflix", icon: SiNetflix },
  { name: "Apple", icon: FaApple },
  { name: "Tesla", icon: SiTesla },
  { name: "Spotify", icon: FaSpotify },
  { name: "Samsung", icon: SiSamsung },
  { name: "PayPal", icon: FaPaypal },
  { name: "Uber", icon: FaUber },
  { name: "Airbnb", icon: FaAirbnb },
];

export default function BrandLogos() {
  return (
    // Giảm padding xuống py-8 để gọn gàng hơn khi không có tiêu đề
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden">
      
      {/* ĐÃ XÓA PHẦN TIÊU ĐỀ "TRUSTED BY..." Ở ĐÂY */}

      <div className="relative flex w-full overflow-hidden mask-gradient">
        {/* Lớp phủ mờ 2 bên màu trắng */}
        <div className="absolute top-0 left-0 z-10 w-32 h-full bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-white to-transparent"></div>

        <motion.div 
            className="flex gap-12 flex-nowrap items-center whitespace-nowrap py-2"
            animate={{ x: [0, -1000] }}
            transition={{ 
                repeat: Infinity, 
                duration: 40, 
                ease: "linear" 
            }}
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer group min-w-[150px] justify-center">
                {/* Logo kích thước vừa phải */}
                <brand.icon className="text-4xl group-hover:scale-110 transition-transform" />
                {/* Tên thương hiệu (Hiện khi màn hình to) */}
                <span className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">{brand.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}