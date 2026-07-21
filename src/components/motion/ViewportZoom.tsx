"use client";

import { useEffect } from "react";

export default function ViewportZoom() {
  useEffect(() => {
    function updateZoom() {
      const baseWidth = 1440;
      const zoom = Math.max(0.25, window.innerWidth / baseWidth);
      document.body.style.zoom = String(zoom);
    }

    updateZoom();
    window.addEventListener("resize", updateZoom);
    window.addEventListener("orientationchange", updateZoom);

    return () => {
      window.removeEventListener("resize", updateZoom);
      window.removeEventListener("orientationchange", updateZoom);
    };
  }, []);

  return null;
}
