import { createClient, groq } from "next-sanity";

export async function getHero() {
  const client = createClient({
    projectId: "5xuvntt7",
    dataset: "production",
    apiVersion: "2023-09-20",
    useCdn: false,
  });

  return client.fetch(groq`*[_type == "hero"][0]`);
}
