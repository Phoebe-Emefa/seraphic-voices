export function parseTeamMemberName(raw: string): { name: string; role: string | null } {
  const trimmed = raw?.trim() ?? "";

  const parenMatch = trimmed.match(/^(.+?)\s*(?:--\s*)?\(([^)]+)\)\s*$/);
  if (parenMatch) {
    return {
      name: parenMatch[1].replace(/--\s*$/, "").trim(),
      role: parenMatch[2].trim(),
    };
  }

  const dashMatch = trimmed.match(/^(.+?)--\s*(.+)$/);
  if (dashMatch) {
    return { name: dashMatch[1].trim(), role: dashMatch[2].trim() };
  }

  return { name: trimmed, role: null };
}

export function resolveTeamMemberDisplay(item: {
  name?: string;
  role?: string;
}): { name: string; role: string | null } {
  const parsed = parseTeamMemberName(item?.name ?? "");

  if (item?.role?.trim()) {
    return { name: parsed.name, role: item.role.trim() };
  }

  return parsed;
}
