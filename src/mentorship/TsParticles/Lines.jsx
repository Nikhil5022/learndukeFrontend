import { useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import {lines} from "./options.js"

function Lines() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
  }, []);

  return (
    <div>
      <Particles id="Lines" options={useMemo(() => lines)} />
    </div>
  );
}

export default Lines;
