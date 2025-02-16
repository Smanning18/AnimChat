import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

export default function StartChatButton({ onClick, disabled = false }: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full max-w-md mx-auto flex items-center justify-center gap-2"
      size="lg"
    >
      <MessageCircle className="w-5 h-5" />
      Start Chat
    </Button>
  );
}
