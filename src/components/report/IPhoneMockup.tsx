import { useRef, useState, useEffect } from "react";

interface IPhoneMockupProps {
  scrollImageSrc?: string;
  iframeSrc?: string;
  alt?: string;
}

export default function IPhoneMockup({ scrollImageSrc, iframeSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setCanScroll(el.scrollHeight > el.clientHeight + 10);
    // Check after image loads
    const img = el.querySelector("img");
    if (img) {
      img.addEventListener("load", check);
    }
    check();
    return () => {
      if (img) img.removeEventListener("load", check);
    };
  }, [scrollImageSrc]);

  return (
    <div className="flex justify-center items-start -mt-8">
      <div className="iphone-mockup">
        <div className="iphone-mockup-island" />
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title={alt}
            className="absolute inset-0 w-full h-full border-0"
            style={{ borderRadius: 38 }}
          />
        ) : (
          <div ref={scrollRef} className="iphone-mockup-scroll">
            <img
              src={scrollImageSrc}
              alt={alt}
              className="w-full h-auto block"
              draggable={false}
            />
          </div>
        )}
        <div className="iphone-mockup-home" />
        {canScroll && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/40 text-[10px] font-medium animate-pulse pointer-events-none">
            ↕ Scroll
          </div>
        )}
      </div>
    </div>
  );
}
