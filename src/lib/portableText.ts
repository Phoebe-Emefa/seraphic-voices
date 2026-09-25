export type PortableChild = {
  text?: string;
  marks?: string[];
};

export type PortableBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: PortableChild[];
};

export function plainPortableText(children?: PortableChild[]) {
  return children?.map((child) => child.text || "").join("") || "";
}

export function hasPortableText(value?: PortableBlock[] | string | null) {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return value.some((block) => plainPortableText(block.children).trim().length > 0);
}
