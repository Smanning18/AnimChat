import { characters } from "@/lib/characters";
import CharacterCard from "./CharacterCard";

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

export default function CharacterGrid({
  onSelectCharacter,
  selectedCharacterId,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          personality={character.personality}
          bio=""
          previewMessage={character.previewMessage}
          imageUrl={character.avatar}
          isSelected={selectedCharacterId === character.id}
          onSelect={() => onSelectCharacter(character)}
        />
      ))}
    </div>
  );
}
