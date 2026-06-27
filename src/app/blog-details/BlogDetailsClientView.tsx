"use client";

import React from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../puck/config";

export function BlogDetailsClientView({ data }: { data: any }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#000000" }}>
      <Render config={config} data={data} />
    </div>
  );
}
