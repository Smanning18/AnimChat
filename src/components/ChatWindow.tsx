import { useEffect, useRef, memo } from "react";
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
  isTyping?: boolean;
}

const ChatMessage = memo(
  ({
    message,
    characterName,
    characterAvatar,
  }: {
    message: Message;
    characterName: string;
    characterAvatar?: string;
  }) => {
    const isUser = message.sender === "user";

    return (
      <div className={`flex gap-6 ${isUser ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <Avatar
          className={`h-8 w-8 ring-1 ${isUser ? "ring-purple-500/20" : "ring-pink-500/20"} shadow-md flex-shrink-0`}
        >
          <AvatarImage
            src={
              isUser
                ? "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                : characterAvatar
            }
            alt={isUser ? "You" : characterName}
            className="object-cover"
          />
          <AvatarFallback
            className={isUser ? "bg-purple-500/5" : "bg-pink-500/5"}
          >
            {isUser ? "U" : "A"}
          </AvatarFallback>
        </Avatar>

        {/* Message Container */}
        <div
          className={`group relative max-w-[65%] ${isUser ? "items-end" : "items-start"}`}
        >
          {/* Message Bubble */}
          <div
            className={`
              relative px-4 py-2.5
              ${
                isUser
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/10"
                  : "bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg shadow-black/5"
              }
              ${
                isUser
                  ? "rounded-2xl rounded-tr-sm"
                  : "rounded-2xl rounded-tl-sm"
              }
              transition-all duration-200
            `}
          >
            {/* Message Content */}
            <p className="whitespace-pre-wrap break-words leading-relaxed text-[0.9375rem]">
              {message.content}
            </p>

            {/* Timestamp */}
            <div
              className={`flex items-center gap-2 mt-3 ${isUser ? "justify-end" : ""}`}
            >
              <div className="flex items-center gap-1.5">
                <div className="h-[1px] w-3 bg-white/10"></div>
                <span className="text-[9px] font-light tracking-wider uppercase text-white/30">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div className="h-[1px] w-3 bg-white/10"></div>
              </div>
            </div>

            {/* Message Tail */}
            <div
              className={`absolute top-0 ${isUser ? "-right-2" : "-left-2"} w-4 h-4`}
            >
              <div
                className={`
                  w-4 h-4 transform rotate-45 translate-y-[6px]
                  ${
                    isUser
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-white/5 border border-white/10"
                  }
                `}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const TypingIndicator = memo(
  ({
    characterAvatar,
    characterName,
  }: {
    characterAvatar?: string;
    characterName: string;
  }) => (
    <div className="flex gap-4">
      <Avatar className="h-8 w-8 ring-1 ring-pink-500/20 shadow-md flex-shrink-0">
        <AvatarImage
          src={characterAvatar}
          alt={characterName}
          className="object-cover"
        />
        <AvatarFallback className="bg-pink-500/5">A</AvatarFallback>
      </Avatar>
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 flex flex-col gap-1.5 shadow-lg shadow-black/5 max-w-[65%]">
        <span className="text-[11px] text-white/40 font-light">
          {characterName.split(":")[0]} is typing
        </span>
        <div className="flex items-center space-x-1.5">
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce" />
          <div
            className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  ),
);

function ChatWindow({
  messages,
  characterName = "AI",
  characterAvatar,
  isTyping = false,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-lg">
      {/* Date separator */}
      <div className="sticky top-0 z-10 px-4 py-2 bg-black/40 backdrop-blur-md border-b border-white/5 shadow-lg">
        <p className="text-xs text-center text-white/60">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Messages container */}
      <div className="p-8 space-y-8">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            characterName={characterName}
            characterAvatar={characterAvatar}
          />
        ))}
        {isTyping && (
          <TypingIndicator
            characterAvatar={characterAvatar}
            characterName={characterName}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default memo(ChatWindow);
