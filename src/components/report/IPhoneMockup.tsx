import { useRef } from "react";

interface IPhoneMockupProps {
  imageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ imageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center">
      <div className="relative w-[280px] h-[560px] rounded-[40px] border-[6px] border-[hsl(var(--foreground)/0.15)] bg-black shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-20" />
        {/* Status bar area */}
        <div className="absolute top-0 left-0 right-0 h-[28px] bg-black z-10" />
        {/* Scrollable content */}
        <div
          ref={scrollRef}
          className="absolute inset-0 top-[28px] overflow-y-auto scrollbar-thin"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-auto block"
            draggable={false}
          />
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full bg-white/30 z-20" />
      </div>
    </div>
  );
}
