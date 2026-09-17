import type { StructureResolver } from "sanity/structure";

const HIDDEN_TYPES = new Set([
  "home",
  "event",
  "eventsPage",
  "events",
  "whoWeAre",
  "teamPage",
  "galleryPage",
  "contactPage",
  "donatePage",
]);

export const deskStructure: StructureResolver = (S) => {
  const singletons = [
    S.listItem()
      .title("Home")
      .id("home")
      .child(S.document().schemaType("home").documentId("home")),
    S.listItem()
      .title("Events")
      .id("event")
      .child(S.document().schemaType("event").documentId("event")),
    S.listItem()
      .title("Who We Are")
      .id("whoWeAre")
      .child(S.document().schemaType("whoWeAre").documentId("whoWeAre")),
    S.listItem()
      .title("Our Team")
      .id("teamPage")
      .child(S.document().schemaType("teamPage").documentId("teamPage")),
    S.listItem()
      .title("Gallery")
      .id("galleryPage")
      .child(S.document().schemaType("galleryPage").documentId("galleryPage")),
    S.listItem()
      .title("Contact")
      .id("contactPage")
      .child(S.document().schemaType("contactPage").documentId("contactPage")),
    S.listItem()
      .title("Donate")
      .id("donatePage")
      .child(S.document().schemaType("donatePage").documentId("donatePage")),
  ];

  const rest = S.documentTypeListItems().filter((item) => {
    const id = item.getId();
    return Boolean(id) && !HIDDEN_TYPES.has(id!);
  });

  return S.list()
    .title("Content")
    .items([...singletons, S.divider(), ...rest]);
};
