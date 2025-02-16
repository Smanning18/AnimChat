import { useState, useEffect } from "react";
import ChatApp from "./ChatApp";
import LoginForm from "./LoginForm";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background p-4">
      {isAuthenticated ? (
        <ChatApp />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default Home;
