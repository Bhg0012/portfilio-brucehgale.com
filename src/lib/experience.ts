import { getCollection, type CollectionEntry } from 'astro:content';
import { formatPartial } from './projects';

export type Experience = CollectionEntry<'experience'>;

/** Most recent first: current roles, then by end date, then start date. */
function sortKey(e: Experience): string {
  if (e.data.current) return `9999-${e.data.start ?? '0000'}`;
  return e.data.end ?? e.data.start ?? '0000';
}

export async function getExperience(): Promise<Experience[]> {
  const all = await getCollection('experience');
  return all.sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}

export const experienceTypeLabels: Record<Experience['data']['type'], string> = {
  founder: 'Founder',
  internship: 'Internship',
  'part-time': 'Part-time',
  'full-time': 'Full-time',
  contract: 'Contract',
  volunteer: 'Volunteer',
  leadership: 'Leadership',
};

/** "May 2026 – Present", "Jun 2023 – Aug 2025", "Oct 2022", or undefined. */
export function formatExperienceDates(e: Experience): string | undefined {
  const { start, end, current } = e.data;
  const from = start ? formatPartial(start) : undefined;
  // Without a start date, "Present" alone adds nothing beyond the Current badge.
  if (!from) return !current && end ? formatPartial(end) : undefined;
  const to = current ? 'Present' : end ? formatPartial(end) : undefined;
  return to && to !== from ? `${from} – ${to}` : from;
}

/** Up to two initials for organizations without a logo, e.g. "Lowe's Companies" -> "LC". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
