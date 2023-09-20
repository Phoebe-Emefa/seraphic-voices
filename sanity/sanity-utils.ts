import { createClient, groq } from "next-sanity";

export async function getHero() {
  const client = createClient({
    projectId: "9qngbf4g",
    dataset: "production",
    apiVersion: "2023-08-06",
    useCdn: false,
  });

  return client.fetch(groq`*[_type == "hero"][0]`);
}
