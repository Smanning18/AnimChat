import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage onStart={() => (window.location.href = "/chat")} />
            }
          />
          <Route path="/chat" element={<Dashboard />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
