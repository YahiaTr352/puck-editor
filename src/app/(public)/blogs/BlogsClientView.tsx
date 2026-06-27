"use client";

import React from "react";
import { Render } from "@puckeditor/core";
import { config } from "../../../puck/config";

export function BlogsClientView({ data }: { data: any }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative", backgroundColor: "#07100E" }}>
      <Render config={config} data={data} />
    </div>
  );
}
