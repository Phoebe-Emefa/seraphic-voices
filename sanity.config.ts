import { defineConfig, type SchemaTypeDefinition } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";
import { deskStructure } from "./sanity/structure";
import "./sanity/studio.css";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}
if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}

const config = defineConfig({
  projectId,
  dataset,
  title: "Seraphic Voices",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-20",
  basePath: "/admin",
  plugins: [structureTool({ structure: deskStructure })],
  schema: {
    types: schemas as SchemaTypeDefinition[],
  },
});

export default config;
