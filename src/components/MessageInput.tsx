import { useState, useRef, useEffect, memo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

function MessageInput({ onSendMessage, disabled = false }: Props) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "60px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-black/20 backdrop-blur-lg border-t border-white/10">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 items-end max-w-4xl mx-auto">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send)"
            className="min-h-[60px] max-h-[200px] resize-none bg-black/20 border-white/10 text-white placeholder:text-white/40 focus:border-purple-500/50 focus:ring-purple-500/20"
            disabled={disabled}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
          >
            <Button
              type="submit"
              size="icon"
              className={`
                h-[60px] w-[60px] rounded-xl
                relative overflow-hidden
                transition-all duration-300 transform
                ${
                  disabled || !message.trim()
                    ? "bg-white/5 text-white/40"
                    : `
                    bg-gradient-to-r from-purple-600 to-pink-600
                    hover:from-purple-500 hover:to-pink-500
                    hover:scale-105
                    shadow-lg shadow-purple-500/25
                    hover:shadow-purple-500/40
                    hover:ring-2 ring-white/20
                    before:absolute before:inset-0
                    before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0
                    before:translate-x-[-200%] hover:before:translate-x-[200%]
                    before:transition-transform before:duration-700 before:ease-in-out
                  `
                }
              `}
              disabled={disabled || !message.trim()}
            >
              <SendHorizontal
                className={`h-5 w-5 transition-transform duration-300 ${!disabled && message.trim() ? "group-hover:scale-110" : ""}`}
              />
            </Button>
          </motion.div>
        </div>
      </form>
    </div>
  );
}

export default memo(MessageInput);
