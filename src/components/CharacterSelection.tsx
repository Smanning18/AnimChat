import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Character {
  id: string;
  name: string;
  personality: string;
  avatar: string;
  previewMessage: string;
}

import { characters } from "@/lib/characters";

interface Props {
  onSelectCharacter: (character: Character) => void;
  selectedCharacterId?: string;
}

export default function CharacterSelection({
  onSelectCharacter,
  selectedCharacterId,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4 bg-background">
      {characters.map((character) => (
        <Card
          key={character.id}
          className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
            selectedCharacterId === character.id ? "ring-2 ring-primary" : ""
          }`}
        >
          <div className="p-4 space-y-4">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-muted">
              <img
                src={character.avatar}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p className="text-sm text-muted-foreground">
                {character.personality}
              </p>
              <div className="bg-muted p-2 rounded-lg">
                <p className="text-sm italic">{character.previewMessage}</p>
              </div>
            </div>

            <Button
              className="w-full"
              variant={
                selectedCharacterId === character.id ? "secondary" : "default"
              }
              onClick={() => onSelectCharacter(character)}
            >
              {selectedCharacterId === character.id ? "Selected" : "Choose"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
