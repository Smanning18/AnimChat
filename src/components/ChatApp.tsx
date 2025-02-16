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
  onBack,
  initialCharacter,
  onSelectCharacter,
}: Props) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    initialCharacter || null,
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Load saved state
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

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setError(null);
    setIsLoading(true);

    try {
      const data = await sendChatMessage(content, selectedCharacter.id);

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
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
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
          <div className="bg-muted px-4 py-2 flex items-center justify-between border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCharacter(null);
                onBack?.();
              }}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <img
                src={selectedCharacter.avatar}
                alt={selectedCharacter.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <h3 className="font-medium">{selectedCharacter.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedCharacter.personality}
                </p>
              </div>
            </div>
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>

          <ChatWindow
            messages={messages}
            characterName={selectedCharacter.name}
            characterAvatar={selectedCharacter.avatar}
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
