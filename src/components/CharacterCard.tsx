import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  name: string;
  personality: string;
  bio: string;
  previewMessage: string;
  imageUrl: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CharacterCard({
  name = "Sakura",
  personality = "Cheerful & Energetic",
  bio = "A bright and optimistic character who loves to help others and believes in the power of friendship.",
  previewMessage = "Hi there! I&quot;m excited to chat with you! ✨",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=aiko",
  isSelected = false,
  onSelect = () => {},
}: Props) {
  return (
    <Card className={`p-4 ${isSelected ? "ring-2 ring-primary" : ""}`}>
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{personality}</p>
        </div>

        <div className="bg-muted p-2 rounded text-sm">
          <p className="italic">{previewMessage}</p>
        </div>

        <Button
          onClick={onSelect}
          variant={isSelected ? "secondary" : "default"}
          className="w-full"
        >
          {isSelected ? "Selected" : "Choose"}
        </Button>
      </div>
    </Card>
  );
}
