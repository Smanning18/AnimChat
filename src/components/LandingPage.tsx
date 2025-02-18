import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import animePattern from "@/assets/images/patterns/pattern.png";
import heroCharacter from "@/assets/images/hero/hero girl.png";

export default function LandingPage({ onStart }: { onStart: () => void }) {
  // Pre-calculate random values for shapes
  const backgroundElements = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      key: i,
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background patterns */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${animePattern})`,
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
          filter: "grayscale(100%) contrast(100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-[95%] md:w-[85%] lg:w-[70%] mx-auto py-12 px-4">
        <div className="text-center px-32 py-20 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col justify-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:to-pink-500/10 before:pointer-events-none">
          {/* Hero Illustration */}
          <div className="absolute -right-8 md:-right-16 lg:-right-24 top-1/2 -translate-y-1/2 w-80 md:w-[450px] lg:w-[520px] h-auto opacity-[0.37] pointer-events-none transform transition-transform hover:scale-105 duration-700">
            <img
              src={heroCharacter}
              alt="Anime character"
              className="w-full h-full object-contain scale-110 origin-center translate-y-4 translate-x-4"
            />
          </div>

          <div className="space-y-10 relative z-10 max-w-xl mr-auto ml-8 mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 leading-tight tracking-tight [text-shadow:_2px_2px_2px_rgb(0_0_0_/_40%),_0_0_30px_rgb(255_0_255_/_20%),_0_0_10px_rgb(255_0_255_/_10%)] relative">
              Enter the World of Your Virtual Anime Girlfriend
            </h1>
            <p className="text-xl md:text-2xl lg:text-4xl text-white/95 max-w-2xl mx-auto font-light leading-normal drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
              Experience meaningful conversations with AI-powered anime
              companions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center relative z-10 mt-12">
            <Button
              size="lg"
              className="text-lg px-12 py-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
              onClick={onStart}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 border-white/20 text-white hover:bg-white/10"
              onClick={onStart}
            >
              Meet the Girls
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
