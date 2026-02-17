import { useRef } from "react";

interface IPhoneMockupProps {
  imageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ imageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-start">
      <div
        className="relative rounded-[44px] bg-black overflow-hidden"
        style={{
          width: 280,
          height: 570,
          boxShadow:
            "0 0 0 3px hsl(var(--foreground) / 0.08), 0 0 0 7px hsl(var(--foreground) / 0.04), 0 25px 70px -10px rgba(0,0,0,0.6)",
          border: "5px solid #2a2a2a",
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
            borderRadius: 39,
          }}
        >
          <img
            src={imageSrc}
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
