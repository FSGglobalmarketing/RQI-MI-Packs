import { useRef } from "react";

interface IPhoneMockupProps {
  scrollImageSrc?: string;
  iframeSrc?: string;
  alt?: string;
}

export default function IPhoneMockup({ scrollImageSrc, iframeSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      </div>
    </div>
  );
}
