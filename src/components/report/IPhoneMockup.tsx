import { useRef } from "react";

interface IPhoneMockupProps {
  scrollImageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ scrollImageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-start -mt-4">
      <div
        className="relative rounded-[44px] bg-black overflow-hidden"
        style={{
          width: 280,
          height: 570,
          boxShadow: "0 25px 70px -10px rgba(0,0,0,0.6)",
          border: "6px solid #333",
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-20" />
        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="absolute inset-0 overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            borderRadius: 38,
          }}
        >
          <img
            src={scrollImageSrc}
            alt={alt}
            className="w-full h-auto block"
            draggable={false}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[90px] h-[4px] rounded-full bg-white/30 z-20" />
      </div>
    </div>
  );
}
