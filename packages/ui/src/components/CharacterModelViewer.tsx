import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CharacterModel } from "./CharacterModel.js";

export interface CharacterModelViewerProps {
  /** URL of the glTF/GLB asset. Defaults to the bundled placeholder model. */
  modelUrl?: string;
  /**
   * Animation clip names to offer in the picker. Until a real
   * uploaded-asset pipeline exists, these are passed in explicitly
   * (the placeholder Fox model has "Survey" | "Walk" | "Run").
   */
  clipNames?: string[];
}

const DEFAULT_MODEL_URL = "/models/Fox.glb";
const DEFAULT_CLIPS = ["Survey", "Walk", "Run"];

export function CharacterModelViewer({
  modelUrl = DEFAULT_MODEL_URL,
  clipNames = DEFAULT_CLIPS,
}: CharacterModelViewerProps) {
  const [activeClip, setActiveClip] = useState<string | null>(clipNames[0] ?? null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", height: "100%" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label htmlFor="animation-clip-select">Animation:</label>
        <select
          id="animation-clip-select"
          value={activeClip ?? ""}
          onChange={(event) => setActiveClip(event.target.value || null)}
        >
          {clipNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, minHeight: 320 }}>
        <Canvas camera={{ position: [2, 1.5, 3], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <CharacterModel modelUrl={modelUrl} activeClip={activeClip} />
          </Suspense>
          <OrbitControls target={[0, 1, 0]} />
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload(DEFAULT_MODEL_URL);
