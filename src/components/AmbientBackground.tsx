"use client";

import React from "react";

interface AmbientBackgroundProps {
  bgStyle?: "fluid" | "aurora" | "minimal" | "off";
  intensity?: number;
  blur?: number;
  speed?: number;
  grain?: boolean;
  mesh?: boolean;
  customObj?: string | null;
  objSize?: number;
  objFit?: "float" | "cover";
  objTint?: number;
}

export const AmbientBackground = ({
  bgStyle = "fluid",
  intensity = 75,
  blur = 60,
  speed = 100,
  grain = true,
  mesh = false,
  customObj = null,
  objSize = 22,
  objFit = "float",
  objTint = 55,
}: AmbientBackgroundProps) => {
  if (bgStyle === "off") return null;

  const k = Math.max(0, Math.min(100, intensity)) / 100;
  const spd = Math.max(20, Math.min(300, speed)) / 100;
  const dur = 1 / spd;
  const tint = Math.max(0, Math.min(100, objTint)) / 100;
  const isVideo = customObj && /^data:video\//.test(customObj);

  return (
    <div
      aria-hidden="true"
      className="ambient-bg"
      data-bg={bgStyle}
      style={{
        "--amb-k": k,
        "--amb-blur": `${blur}px`,
        "--amb-dur": `${dur}s`,
      } as any}
    >
      <span className="fluid-blob fluid-blob--1" />
      <span className="fluid-blob fluid-blob--2" />
      <span className="fluid-blob fluid-blob--3" />
      <span className="fluid-blob fluid-blob--4" />

      {mesh && <span className="ambient-mesh" />}
      {grain && <span className="ambient-noise" />}

      {customObj && (
        <div
          className="amb-obj-wrap"
          style={{ "--amb-obj-size": `${objSize}vw` } as any}
          data-fit={objFit}
        >
          {isVideo ? (
            <video
              src={customObj}
              autoPlay
              loop
              muted
              playsInline
              className="amb-obj"
              style={{
                filter: `hue-rotate(calc(var(--brand-hue, 140) * 1deg - 140deg)) saturate(${tint})`,
              }}
            />
          ) : (
            <img
              src={customObj}
              alt=""
              className="amb-obj"
              style={{
                filter: `hue-rotate(calc(var(--brand-hue, 140) * 1deg - 140deg)) saturate(${tint})`,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
