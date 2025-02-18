import { characters } from "./characters";

const getRandomResponse = (character: (typeof characters)[0]) => {
  const responses = [
    `*smiles warmly* ${character.previewMessage}`,
    `That's interesting! Tell me more about it~`,
    `*thinks thoughtfully* I really enjoy talking with you about this.`,
    `*giggles* You always know how to make our conversations fun!`,
    `That reminds me of something... *looks dreamy*`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const mockSendChatMessage = async (
  message: string,
  characterId: string,
  setIsTyping?: (typing: boolean) => void,
) => {
  setIsTyping?.(true);

  // Simulate network delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 2000),
  );

  const character = characters.find((c) => c.id === characterId);
  if (!character) throw new Error("Character not found");

  return {
    response: getRandomResponse(character),
    timestamp: new Date().toISOString(),
  };
};
