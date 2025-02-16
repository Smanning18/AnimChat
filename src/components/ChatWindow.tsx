import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "character";
  timestamp: string;
  characterName?: string;
  characterAvatar?: string;
}

interface Props {
  messages: Message[];
  characterName?: string;
  characterAvatar?: string;
}

export default function ChatWindow({
  messages,
  characterName = "AI",
  characterAvatar,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
        >
          <Avatar>
            <AvatarImage
              src={
                message.sender === "user"
                  ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                  : message.characterAvatar || characterAvatar
              }
              alt={
                message.sender === "user"
                  ? "User"
                  : message.characterName || characterName
              }
            />
            <AvatarFallback>
              {message.sender === "user" ? "U" : "A"}
            </AvatarFallback>
          </Avatar>

          <div
            className={`rounded-lg p-3 max-w-[80%] ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p className="text-sm mb-1">
              {message.sender === "user"
                ? "You"
                : message.characterName || characterName}
            </p>
            <p className="whitespace-pre-wrap">{message.content}</p>
            <p className="text-xs opacity-70 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
