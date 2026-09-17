import { createClient, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

let clientInstance: SanityClient | null = null;

function resolveSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

  if (!projectId) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  if (!dataset) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
  }

  return { projectId, dataset, apiVersion };
}

export function getSanityClient(): SanityClient {
  if (clientInstance) return clientInstance;

  const { projectId, dataset, apiVersion } = resolveSanityConfig();
  clientInstance = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    timeout: 30_000,
    maxRetries: 5,
  });

  return clientInstance;
}

/** Lazy proxy so missing env vars do not crash the app at import time. */
export const client: SanityClient = new Proxy({} as SanityClient, {
  get(_target, prop, receiver) {
    const value = Reflect.get(getSanityClient(), prop, receiver);
    return typeof value === "function" ? value.bind(getSanityClient()) : value;
  },
});

const builder = () => imageUrlBuilder(getSanityClient());

export const urlFor = (source: any) => builder().image(source);

export const imageSrc = (source: any) => {
  if (!source) return undefined;
  try {
    return builder().image(source).url();
  } catch {
    return undefined;
  }
};
