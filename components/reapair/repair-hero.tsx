import Image from "next/image";
import { ScanBarcode, Search } from "lucide-react"; // or any scan icon you prefer

export function RepairHero() {
  return (
    
    <section id="repair" className="relative w-full h-[12rem] md:h-[28rem] overflow-hidden pb-10">
        <div>
      {/* Background image */}
      <Image
        src="/repair/repair-background.jpg"
        alt="Repair Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center py-5 md:pt-32 px-4">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center">
          What are you fixing?
        </h1>
        <p className="text-white mt-2 text-center text-sm md:text-base">
          Search hundreds of devices and thousands of parts.
        </p>

        {/* Search Bar */}
        <div className="mt-5 md:mt-10 m-auto w-full max-w-xl px-3">
          <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-2">
             <button className=" text-gray-600 hover:text-black">
              <Search className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Search your device or model..."
              className="flex-grow bg-transparent outline-none px-2 text-sm md:text-base"
            />
           <ScanBarcode />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
