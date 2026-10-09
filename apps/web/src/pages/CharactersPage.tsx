import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { trpc } from "../trpc.js";

export function CharactersPage() {
  const navigate = useNavigate();
  const utils = trpc.useUtils();
  const characters = trpc.character.list.useQuery();
  const [newName, setNewName] = useState("");

  const create = trpc.character.create.useMutation({
    onSuccess: async (character) => {
      await utils.character.list.invalidate();
      navigate(`/characters/${character.id}`);
    },
  });

  const duplicate = trpc.character.duplicate.useMutation({
    onSuccess: () => utils.character.list.invalidate(),
  });

  const remove = trpc.character.delete.useMutation({
    onSuccess: () => utils.character.list.invalidate(),
  });

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, undefined);
      navigate("/login");
    },
  });

  return (
    <div style={{ maxWidth: 640, margin: "2rem auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Meine Charaktere</h1>
        <button onClick={() => logout.mutate()}>Abmelden</button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newName.trim()) create.mutate({ name: newName.trim() });
        }}
        style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}
      >
        <input
          placeholder="Name des neuen Charakters"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" disabled={create.isPending}>
          Neuer Charakter
        </button>
      </form>

      {characters.isLoading && <p>Lade...</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {characters.data?.map((character) => (
          <li
            key={character.id}
            style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}
          >
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
            <span style={{ display: "flex", gap: "0.5rem" }}>
              <button onClick={() => duplicate.mutate({ id: character.id })}>Kopieren</button>
              <button onClick={() => remove.mutate({ id: character.id })}>Löschen</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
