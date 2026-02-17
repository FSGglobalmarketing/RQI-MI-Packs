import { useRef } from "react";

interface IPhoneMockupProps {
  imageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ imageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center py-4">
      <div
        className="relative rounded-[36px] bg-black overflow-hidden"
        style={{
          width: 220,
          height: 450,
          boxShadow:
            "0 0 0 3px hsl(var(--foreground) / 0.08), 0 0 0 7px hsl(var(--foreground) / 0.04), 0 20px 60px -10px rgba(0,0,0,0.5)",
          border: "4px solid #2a2a2a",
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[80px] h-[22px] bg-black rounded-full z-20" />
        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="absolute inset-0 top-0 overflow-y-auto"
          style={{
            WebkitOverflowScrolling: "touch",
            borderRadius: 32,
          }}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-auto block"
            draggable={false}
            style={{ imageRendering: "auto" }}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[80px] h-[3px] rounded-full bg-white/30 z-20" />
      </div>
    </div>
  );
}
