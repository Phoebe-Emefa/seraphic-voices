const PILLAR_INJECTION = /\s+FAITH\s+/i;

export function cleanMissionStatement(raw: string): string {
  const trimmed = raw.trim();
  const match = trimmed.match(PILLAR_INJECTION);

  if (match?.index && match.index > 40) {
    return trimmed.slice(0, match.index).trim();
  }

  return trimmed;
}

export function splitMissionLines(statement: string): string[] {
  const cleaned = cleanMissionStatement(statement);
  const sentences = cleaned
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((part) => part.trim())
    .filter(Boolean);

  return sentences.length ? sentences : [cleaned];
}

export function splitPillarBody(body: string): string[] {
  const trimmed = body.trim();
  const sentences = trimmed
    .split(/(?<=[.!?])\s+(?=[A-Z"'(])/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentences.length <= 1) return [trimmed];
  return sentences;
}
