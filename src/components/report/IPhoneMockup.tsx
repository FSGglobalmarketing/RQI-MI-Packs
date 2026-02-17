import { useRef } from "react";

interface IPhoneMockupProps {
  scrollImageSrc: string;
  alt?: string;
}

export default function IPhoneMockup({ scrollImageSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center items-start -mt-8">
      <div className="iphone-mockup">
        <div className="iphone-mockup-island" />
        <div ref={scrollRef} className="iphone-mockup-scroll">
          <img
            src={scrollImageSrc}
            alt={alt}
            className="block"
            draggable={false}
          />
        </div>
        <div className="iphone-mockup-home" />
      </div>
    </div>
  );
}
