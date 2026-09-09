const CLOSING_PATTERN = /one choir\.?\s*many voices/i;
const TAGLINE_FRAGMENT =
  /^(one choir|many voices|rooted in faith|shaped by africa|singing from toronto)/i;

function isTaglineFragment(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length < 90 && TAGLINE_FRAGMENT.test(trimmed);
}

function mergeTaglineFragments(body: string[], closing: string | null): StoryCopy {
  const taglineParts: string[] = [];
  const remaining: string[] = [];

  for (const paragraph of body) {
    if (isTaglineFragment(paragraph)) {
      taglineParts.push(paragraph);
    } else {
      remaining.push(paragraph);
    }
  }

  if (!taglineParts.length) {
    return { lead: "", body: remaining, closing };
  }

  const mergedClosing = [...taglineParts, closing].filter(Boolean).join(" ");
  return { lead: "", body: remaining, closing: mergedClosing };
}

function splitSentences(text: string): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  return normalized
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function groupSentences(sentences: string[], perGroup: number): string[] {
  const groups: string[] = [];
  for (let i = 0; i < sentences.length; i += perGroup) {
    groups.push(sentences.slice(i, i + perGroup).join(" "));
  }
  return groups;
}

function expandParagraph(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const sentences = splitSentences(trimmed);
  if (sentences.length <= 2 && trimmed.length <= 260) {
    return [trimmed];
  }

  return groupSentences(sentences, 2);
}

function extractTaglineClosing(text: string): { remainder: string; closing: string | null } {
  const match = text.match(/(one choir[\s\S]*)$/i);
  if (!match || !CLOSING_PATTERN.test(match[1])) {
    return { remainder: text, closing: null };
  }

  const closing = match[1].trim();
  const remainder = text.slice(0, match.index).trim();
  return { remainder, closing };
}

export type StoryCopy = {
  lead: string;
  body: string[];
  closing: string | null;
};

export function normalizeStoryCopy(rawParagraphs: string[]): StoryCopy {
  const expanded = rawParagraphs.flatMap(expandParagraph).filter(Boolean);

  if (!expanded.length) {
    return { lead: "", body: [], closing: null };
  }

  let closing: string | null = null;
  let working = expanded;

  const last = working[working.length - 1];
  const { remainder, closing: tagline } = extractTaglineClosing(last);

  if (tagline) {
    closing = tagline;
    if (remainder) {
      working = [...working.slice(0, -1), ...expandParagraph(remainder)];
    } else {
      working = working.slice(0, -1);
    }
  }

  if (!working.length) {
    return { lead: "", body: [], closing };
  }

  const firstSentences = splitSentences(working[0]);
  const lead = firstSentences.slice(0, 2).join(" ");
  const firstRemainder = firstSentences.slice(2).join(" ");

  const body = [
    ...(firstRemainder ? [firstRemainder] : []),
    ...working.slice(1),
  ];

  const merged = mergeTaglineFragments(body, closing);
  return { lead, body: merged.body, closing: merged.closing };
}

export function splitClosingLines(closing: string): string[] {
  const sentences = splitSentences(closing);
  if (sentences.length <= 3) return sentences;

  return [
    sentences.slice(0, 2).join(" "),
    sentences.slice(2, 4).join(" "),
    sentences.slice(4).join(" "),
  ].filter(Boolean);
}

export function promoteStoryIntro(body: string[]): { intro: string | null; rest: string[] } {
  const index = body.findIndex((paragraph) => /still becoming/i.test(paragraph));

  if (index === -1) {
    return { intro: null, rest: body };
  }

  return {
    intro: body[index],
    rest: body.filter((_, itemIndex) => itemIndex !== index),
  };
}

export type StoryLayoutChunks = {
  besideFirst: string[];
  fullWidth: string[];
  besideSecond: string[];
};

/** Splits body copy for: section 1 sidebar, full-width break, section 2 sidebar. */
export function splitStoryLayout(paragraphs: string[]): StoryLayoutChunks {
  if (!paragraphs.length) {
    return { besideFirst: [], fullWidth: [], besideSecond: [] };
  }

  if (paragraphs.length === 1) {
    return { besideFirst: paragraphs, fullWidth: [], besideSecond: [] };
  }

  if (paragraphs.length === 2) {
    return {
      besideFirst: [paragraphs[0]],
      fullWidth: [],
      besideSecond: [paragraphs[1]],
    };
  }

  return {
    besideFirst: [paragraphs[0]],
    fullWidth: paragraphs.slice(1, -1),
    besideSecond: [paragraphs[paragraphs.length - 1]],
  };
}

export function chunkParagraphs(paragraphs: string[], chunkCount: number): string[][] {
  if (!paragraphs.length || chunkCount <= 0) return [];
  if (chunkCount === 1) return [paragraphs];

  const chunkSize = Math.ceil(paragraphs.length / chunkCount);
  const chunks: string[][] = [];

  for (let i = 0; i < paragraphs.length; i += chunkSize) {
    chunks.push(paragraphs.slice(i, i + chunkSize));
  }

  return chunks;
}
