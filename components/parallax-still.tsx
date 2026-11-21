"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ParallaxStillProps = {
  src: string;
  alt: string;
  sizes: string;
  /**
   * Optional future loop. When a file exists, pass it and the still holds
   * the poster. Until then this renders the photograph only.
   */
  videoSrc?: string;
};

export function ParallaxStill({ src, alt, sizes, videoSrc }: ParallaxStillProps) {
  const frame = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (videoSrc) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      return;
    }

    let request = 0;
    const update = () => {
      request = 0;
      const element = frame.current;
      if (!element) {
        return;
      }
      const rect = element.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const delta = (rect.top + rect.height / 2 - view / 2) / view;
      const next = Math.max(-28, Math.min(28, delta * -36));
      setShift(next);
    };

    const onScroll = () => {
      if (request) {
        return;
      }
      request = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (request) {
        window.cancelAnimationFrame(request);
      }
    };
  }, [videoSrc]);

  return (
    <div
      ref={frame}
      className="relative aspect-[1692/1804] w-full overflow-hidden bg-black"
    >
      <div
        className="absolute inset-x-0 -top-[8%] h-[116%]"
        style={{ transform: videoSrc ? undefined : `translate3d(0, ${shift}px, 0)` }}
      >
        <Image
          src={src}
          alt={videoSrc ? "" : alt}
          fill
          sizes={sizes}
          quality={85}
          className="object-cover"
        />
      </div>
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={src}
          preload="metadata"
          aria-label={alt}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
