import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CharacterModelViewer } from "@ne/ui";
import type { CharacterData } from "@ne/shared-types";
import { trpc } from "../trpc.js";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const utils = trpc.useUtils();
  const character = trpc.character.byId.useQuery({ id: id! }, { enabled: !!id });
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (character.data) {
      setNotes((character.data.data as { notes?: string }).notes ?? "");
    }
  }, [character.data]);

  const update = trpc.character.update.useMutation({
    onSuccess: () => utils.character.byId.invalidate({ id: id! }),
  });

  const necota = trpc.export.necota.useQuery({ id: id! }, { enabled: false });

  if (!character.data) return <p>Lade...</p>;

  function handleSaveNotes() {
    const data: CharacterData = { ...(character.data!.data as CharacterData), notes };
    update.mutate({ id: id!, data });
  }

  async function handleNecotaExport() {
    const result = await necota.refetch();
    if (result.data) {
      const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${character.data!.name}.necota.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <Link to="/">&larr; Zurück zur Liste</Link>
      <h1>{character.data.name}</h1>

      <section>
        <h2>Notizen (Platzhalter-Daten)</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          style={{ width: "100%" }}
        />
        <button onClick={handleSaveNotes} disabled={update.isPending}>
          Speichern
        </button>
      </section>

      <section>
        <h2>3D-Modell</h2>
        <div style={{ height: 400, border: "1px solid #ddd" }}>
          <CharacterModelViewer />
        </div>
      </section>

      <section>
        <h2>Export</h2>
        <a href={`${API_URL}/characters/${id}/export.pdf`} target="_blank" rel="noreferrer">
          <button type="button">Als PDF exportieren</button>
        </a>
        <button type="button" onClick={handleNecotaExport}>
          Als NECOTA-JSON exportieren (Platzhalter)
        </button>
      </section>
    </div>
  );
}
