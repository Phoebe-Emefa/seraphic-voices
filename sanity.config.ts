import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import schemas from "./sanity/schemas";

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "5xuvntt7",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  title: "Seraphic Voices",
  apiVersion: "2023-09-20",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: schemas,
  },
});

export default config;
