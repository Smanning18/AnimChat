import { useState } from "react";
import animePattern from "@/assets/images/patterns/pattern.png";
import { MessageCircle, Settings, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import CharacterGrid from "./CharacterGrid";
import ChatApp from "./ChatApp";

type View = "characters" | "chat" | "settings" | "profile";

export default function Dashboard() {
  const [view, setView] = useState<View>("characters");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950 relative">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${animePattern})`,
          backgroundSize: "600px",
          backgroundRepeat: "repeat",
          filter: "grayscale(100%) contrast(100%)",
        }}
      />
      {/* Sidebar */}
      <div className="w-16 bg-black/40 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-4 gap-4 relative z-10">
        <Button
          variant={view === "characters" ? "default" : "ghost"}
          size="icon"
          onClick={() => {
            setView("characters");
            setSelectedCharacter(null);
          }}
        >
          <Home className="h-5 w-5" />
        </Button>
        <Button
          variant={view === "chat" ? "default" : "ghost"}
          size="icon"
          onClick={() => setView("chat")}
          disabled={!selectedCharacter && view !== "chat"}
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button
          variant={view === "settings" ? "default" : "ghost"}
          size="icon"
          onClick={() => setView("settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant={view === "profile" ? "default" : "ghost"}
          size="icon"
          onClick={() => setView("profile")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative z-10 bg-black/20 backdrop-blur-sm">
        {view === "characters" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Choose Your Companion</h1>
            <CharacterGrid
              onSelectCharacter={(character) => {
                setSelectedCharacter(character);
                setView("chat");
              }}
              selectedCharacterId={selectedCharacter?.id}
            />
          </div>
        )}
        {view === "chat" && (
          <ChatApp
            initialCharacter={selectedCharacter}
            onBack={() => {
              setSelectedCharacter(null);
              setView("characters");
            }}
          />
        )}
        {view === "settings" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
        {view === "profile" && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}
