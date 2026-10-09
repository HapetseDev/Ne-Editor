import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { Group } from "three";

export interface CharacterModelProps {
  modelUrl: string;
  activeClip: string | null;
}

export function CharacterModel({ modelUrl, activeClip }: CharacterModelProps) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!activeClip) return;
    const action = actions[activeClip];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, activeClip]);

  return <primitive ref={group} object={scene} />;
}
