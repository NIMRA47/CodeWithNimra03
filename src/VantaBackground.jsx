import { useEffect, useRef } from "react";
import * as THREE from "three";
import FOG from "vanta/dist/vanta.fog.min";

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const effect = FOG({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      highlightColor: 0x7274c0,
      midtoneColor: 0x092ae6,
      lowlightColor: 0x9290d9,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaBackground;