import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const config = defineConfig({
  projectId: projectId as string,
  dataset: dataset as string,
  title: "Seraphic Voices",
  apiVersion: apiVersion as string,
  basePath: "/admin",
  plugins: [deskTool()],
  schema: {
    types: schemas,
  },
});

export default config;
