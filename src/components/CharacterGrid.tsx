import { characters } from "@/lib/characters";
import CharacterCard from "./CharacterCard";
import { Heart, Compass, Coffee, Flower, Cloud } from "lucide-react";

interface Character {
  id: string;
  name: string;
  personality: string;
  previewMessage: string;
  avatar: string;
}

interface Props {
  onSelectCharacter: (character: Character) => void;
  selectedCharacterId?: string;
}

// Map character IDs to their respective icons and colors
const characterIcons: Record<string, { icon: React.ReactNode; color: string }> =
  {
    aiko: {
      icon: <Heart className="h-4 w-4" />,
      color: "text-rose-300/90",
    },
    hikari: {
      icon: <Compass className="h-4 w-4" />,
      color: "text-blue-300/90",
    },
    rin: {
      icon: <Coffee className="h-4 w-4" />,
      color: "text-purple-300/90",
    },
    mei: {
      icon: <Flower className="h-4 w-4" />,
      color: "text-pink-300/90",
    },
    sora: {
      icon: <Cloud className="h-4 w-4" />,
      color: "text-sky-300/90",
    },
  };

export default function CharacterGrid({
  onSelectCharacter,
  selectedCharacterId,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 p-2">
      {characters.map((character) => (
        <div
          key={character.id}
          className={`group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl ${
            selectedCharacterId === character.id
              ? "ring-2 ring-rose-300/50 shadow-rose-300/20"
              : "shadow-black/20"
          }`}
          onClick={() => onSelectCharacter(character)}
        >
          <div className="aspect-[3/4] relative overflow-hidden">
            {/* Character Image */}
            <div className="absolute inset-0">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Gradient Overlay - Stronger at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, 
                  rgba(0,0,0,0.95) 0%, 
                  rgba(0,0,0,0.8) 30%, 
                  rgba(0,0,0,0.4) 60%, 
                  rgba(0,0,0,0) 100%
                )`,
              }}
            />

            {/* Content Container - Positioned at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 space-y-2">
              {/* Name and Description */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-lg font-bold leading-tight text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {character.name.split(":")[0]}
                  </h3>
                  {/* Character Icon */}
                  <div
                    className={`${characterIcons[character.id].color} opacity-80`}
                  >
                    {characterIcons[character.id].icon}
                  </div>
                </div>
                <p className="font-sans text-sm tracking-wide text-slate-200/90 leading-relaxed">
                  {character.name.split(":")[1]}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-medium bg-white/10 border border-white/20 text-slate-200">
                    {character.personality}
                  </span>
                </div>
              </div>

              {/* Preview Message - Speech Bubble */}
              <div className="relative p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                <p className="font-sans text-sm italic text-slate-200/90 leading-relaxed">
                  {character.previewMessage}
                </p>
              </div>

              {/* CTA Button */}
              <button className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all duration-200 transform hover:scale-[1.02]">
                Chat with {character.name.split(":")[0]}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
