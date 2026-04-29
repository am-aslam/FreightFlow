export default function HeroVisual() {
  return (
    <div className="flex h-full items-center justify-center lg:justify-start">
      <div className="w-full max-w-[620px] overflow-hidden bg-transparent">
        <video
          className="h-auto w-full bg-transparent object-contain mix-blend-multiply rounded-lg"
          src="/vd.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Animated logistics freight visual"
        />
      </div>
    </div>
  );
}
