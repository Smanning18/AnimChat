import CharacterCard from "./CharacterCard";

interface Character {
  id: string;
  name: string;
  personality: string;
  bio: string;
  previewMessage: string;
  imageUrl: string;
}

const characters = [
  {
    id: "1",
    name: "Sakura",
    personality: "Cheerful & Energetic",
    bio: "A bright and optimistic character who loves to help others and believes in the power of friendship.",
    previewMessage: "Hi there! I&quot;m excited to chat with you! ✨",
    imageUrl:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Yuki",
    personality: "Cool & Mysterious",
    bio: "A calm and collected individual with a hidden depth of knowledge.",
    previewMessage: "*adjusts glasses* Interesting...",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki",
  },
];

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
          {...character}
          isSelected={selectedCharacterId === character.id}
          onSelect={() => onSelectCharacter(character)}
        />
      ))}
    </div>
  );
}
