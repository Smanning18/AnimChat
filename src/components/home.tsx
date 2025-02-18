import { useState, useEffect } from "react";
import { testBackendConnection } from "@/lib/testConnection";
import LandingPage from "./LandingPage";
import ChatApp from "./ChatApp";
import LoginForm from "./LoginForm";
import CharacterSelection from "./CharacterSelection";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    // Test backend connection
    testBackendConnection().catch(() => setConnectionError(true));

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
    <div className="w-screen h-screen">
      {connectionError && (
        <div className="fixed top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-md shadow-lg">
          Unable to connect to backend
        </div>
      )}
      {!isAuthenticated ? (
        <LandingPage onLoginSuccess={handleLoginSuccess} />
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
