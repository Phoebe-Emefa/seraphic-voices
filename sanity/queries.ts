export const queryKeys = {
  homePage: ["homePage"] as const,
  eventPage: ["eventPage"] as const,
  galleryPage: ["galleryPage"] as const,
  whoWeArePage: ["whoWeArePage"] as const,
  teamPage: ["teamPage"] as const,
  contactPage: ["contactPage"] as const,
  donatePage: ["donatePage"] as const,
};

function singletonDoc(type: string, id: string, fields: string) {
  return `coalesce(
    *[_id == "${id}"][0],
    *[_type == "${type}"] | order(_updatedAt desc) [0]
  )${fields}`;
}

export const groqQueries = {
  homePage: `${singletonDoc("home", "home", `{
    hero,
    about,
    repertoire,
    upcomingEvents,
    contact
  }`)}`,
  eventPage: `coalesce(
    *[_id == "event"][0],
    *[_id == "eventsPage"][0]
  ){
    hero,
    listing,
    bookingCta
  }`,
  galleryPage: `{
    "page": ${singletonDoc("galleryPage", "galleryPage", `{
      hero,
      listing
    }`)}
  }`,
  whoWeArePage: `${singletonDoc("whoWeAre", "whoWeAre", `{
    hero,
    story,
    vision,
    mission,
    belief
  }`)}`,
  teamPage: `{
    "page": ${singletonDoc("teamPage", "teamPage", `{
      hero,
      listing
    }`)}
  }`,
  contactPage: `{
    "page": ${singletonDoc("contactPage", "contactPage", `{
      hero,
      content
    }`)}
  }`,
  donatePage: `{
    "page": ${singletonDoc("donatePage", "donatePage", `{
      hero,
      content
    }`)}
  }`,
};
