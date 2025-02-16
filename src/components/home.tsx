import { useState, useEffect } from "react";
import ChatApp from "./ChatApp";
import LoginForm from "./LoginForm";
import CharacterSelection from "./CharacterSelection";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleBack = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background p-4">
      {!isAuthenticated ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ChatApp
          initialCharacter={selectedCharacter}
          onBack={handleBack}
          onSelectCharacter={setSelectedCharacter}
        />
      )}
    </div>
  );
}

export default Home;
