import { useRef, useState, useEffect } from "react";

interface IPhoneMockupProps {
  scrollImageSrc?: string;
  iframeSrc?: string;
  alt?: string;
}

const PHONE_VIEWPORT_WIDTH = 300;

function inferNativeScale(naturalWidth: number) {
  if (naturalWidth >= 1100) return 3;
  if (naturalWidth >= 700) return 2;
  return 1;
}

export default function IPhoneMockup({ scrollImageSrc, iframeSrc, alt = "Phone preview" }: IPhoneMockupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [renderSize, setRenderSize] = useState({ width: PHONE_VIEWPORT_WIDTH, height: 610 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || iframeSrc) return;

    const check = () => setCanScroll(el.scrollHeight > el.clientHeight + 4);
    check();

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(check) : null;
    resizeObserver?.observe(el);
    window.addEventListener("resize", check);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [iframeSrc, scrollImageSrc, renderSize.width, renderSize.height]);

  return (
    <div className="flex justify-center">
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
            <div className="relative shrink-0" style={{ width: `${renderSize.width}px`, minHeight: `${renderSize.height}px` }}>
              <img
                src={scrollImageSrc}
                alt={alt}
                loading="lazy"
                draggable={false}
                className="block max-w-none select-none"
                style={{ width: `${renderSize.width}px`, height: `${renderSize.height}px` }}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  if (!img.naturalWidth || !img.naturalHeight) return;

                  const nativeScale = inferNativeScale(img.naturalWidth);
                  const cssWidth = img.naturalWidth / nativeScale;
                  const cssHeight = img.naturalHeight / nativeScale;
                  const width = Math.max(PHONE_VIEWPORT_WIDTH, Math.round(cssWidth));
                  const height = Math.round(cssHeight * (width / cssWidth));

                  setRenderSize({ width, height });
                }}
              />
            </div>
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

