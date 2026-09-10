"use client";

import { useEffect, useState } from "react";

/** Detects WebGL support on the client only — SSR always starts as false. */
export function useWebGLSupport() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setOk(!!(window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl"))));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}
