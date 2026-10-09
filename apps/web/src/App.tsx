import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { trpc } from "./trpc.js";
import { AuthPage } from "./pages/AuthPage.js";
import { CharactersPage } from "./pages/CharactersPage.js";
import { CharacterDetailPage } from "./pages/CharacterDetailPage.js";

function RequireAuth({ children }: { children: ReactNode }) {
  const me = trpc.auth.me.useQuery(undefined, { retry: false });

  if (me.isLoading) return <p>Lade...</p>;
  if (me.isError) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <CharactersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/characters/:id"
        element={
          <RequireAuth>
            <CharacterDetailPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
