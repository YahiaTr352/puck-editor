"use client";

import React from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../../puck/config";
import { AmbientBackground } from "../../../components/AmbientBackground";

export function FAQClientView({ data }: { data: any }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AmbientBackground bgStyle="off" intensity={75} blur={60} speed={100} grain={true} mesh={false} />
      <Render config={config} data={data} />
    </div>
  );
}
