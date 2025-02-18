import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import CharacterSelection from "./CharacterSelection";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import { sendChatMessage } from "@/lib/api";

interface Character {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  previewMessage: string;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "character";
  timestamp: string;
  characterName?: string;
  characterAvatar?: string;
}

function getStorageKey(characterId?: string) {
  const token = localStorage.getItem("token");
  const userId = token ? token.split("-")[1] : "anonymous";
  return `chat_state_${userId}_${characterId}`;
}

interface Props {
  onBack?: () => void;
  initialCharacter?: Character | null;
  onSelectCharacter?: (character: Character | null) => void;
}

export default function ChatApp({
  onBack = () => (window.location.href = "/"),
  initialCharacter = null,
  onSelectCharacter = () => {},
}: Props = {}) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    initialCharacter || null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load saved state from localStorage
  useEffect(() => {
    if (selectedCharacter) {
      const savedState = localStorage.getItem(
        getStorageKey(selectedCharacter.id),
      );
      if (savedState) {
        try {
          const { chatMessages } = JSON.parse(savedState);
          setMessages(chatMessages);
        } catch (e) {
          console.error("Failed to load saved chat state:", e);
        }
      }
    }
  }, [selectedCharacter]);

  // Save state on changes
  useEffect(() => {
    if (selectedCharacter && messages.length > 0) {
      localStorage.setItem(
        getStorageKey(selectedCharacter.id),
        JSON.stringify({
          chatMessages: messages,
        }),
      );
    }
  }, [selectedCharacter, messages]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);

    // Load existing messages or start fresh
    const savedState = localStorage.getItem(getStorageKey(character.id));
    if (savedState) {
      try {
        const { chatMessages } = JSON.parse(savedState);
        setMessages(chatMessages);
        return;
      } catch (e) {
        console.error("Failed to load saved chat state:", e);
      }
    }

    // If no saved messages, start with welcome message
    setMessages([
      {
        id: "welcome",
        content: character.previewMessage,
        sender: "character",
        timestamp: new Date().toISOString(),
        characterName: character.name,
        characterAvatar: character.avatar,
      },
    ]);
    setError(null);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedCharacter) return;

    // Auth disabled for now
    const userId = "anonymous";

    // Add message to UI immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      setIsLoading(true);
      setError(null);
      const data = await sendChatMessage(
        content,
        selectedCharacter.id,
        setIsTyping,
      );

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: "character",
        timestamp: data.timestamp || new Date().toISOString(),
        characterName: selectedCharacter.name,
        characterAvatar: selectedCharacter.avatar,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
      // Remove the user's message if we couldn't get a response
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.sender === "user");

    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {!selectedCharacter ? (
        <div className="flex-1 overflow-auto">
          <CharacterSelection
            onSelectCharacter={handleCharacterSelect}
            selectedCharacterId={selectedCharacter?.id}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <header className="bg-gradient-to-b from-black/50 to-black/30 backdrop-blur-xl border-b border-white/10 shadow-lg">
            <div className="h-16 px-4 flex items-center gap-4 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/5 before:via-pink-500/5 before:to-purple-500/5">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedCharacter(null);
                  onBack?.();
                }}
                className="hover:bg-white/5 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              {/* Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-white/10 to-white/5" />

              {/* Character Info */}
              <div className="flex items-center gap-3 flex-1">
                {/* Avatar with subtle glow */}
                <div className="relative transform transition-transform duration-300 hover:scale-105">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md animate-pulse" />
                  <img
                    src={selectedCharacter.avatar}
                    alt={selectedCharacter.name}
                    className="relative w-9 h-9 rounded-full border border-white/20 object-cover ring-2 ring-white/10"
                  />
                </div>

                {/* Name and Status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">
                      {selectedCharacter.name.split(":")[0]}
                    </h3>
                    {isLoading && (
                      <Loader2 className="w-3 h-3 animate-spin text-white/40 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-white/50 truncate">
                    {selectedCharacter.personality}
                  </p>
                </div>
              </div>
            </div>
          </header>

          <ChatWindow
            messages={messages}
            characterName={selectedCharacter.name}
            characterAvatar={selectedCharacter.avatar}
            isTyping={isTyping}
          />

          {error && (
            <Alert variant="destructive" className="mx-4 my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                {error}
                <Button variant="outline" size="sm" onClick={handleRetry}>
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <MessageInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}
