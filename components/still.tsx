import Image from "next/image";

type StillProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  zoom?: boolean;
  /** Scale the still to crop surrounding black. 1 leaves the frame as shot. */
  focusScale?: number;
  /**
   * Optional future loop. Pass a file in public/ when one exists.
   * Omitted sources render the still only — never an empty video element.
   */
  videoSrc?: string;
};

export function Still({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
  zoom = false,
  focusScale = 1,
  videoSrc,
}: StillProps) {
  return (
    <div className={className ? `relative overflow-hidden bg-black ${className}` : "relative overflow-hidden bg-black"}>
      <div
        className="absolute inset-0"
        style={focusScale === 1 ? undefined : { transform: `scale(${focusScale})` }}
      >
        <Image
          src={src}
          alt={videoSrc ? "" : alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={85}
          className={`${zoom ? "still-zoom " : ""}${imageClassName ?? "object-contain"}`}
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
