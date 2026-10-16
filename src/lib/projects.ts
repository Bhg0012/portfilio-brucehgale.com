import { getCollection, type CollectionEntry } from 'astro:content';
import { CAPABILITIES } from '../content.config';

export type Project = CollectionEntry<'projects'>;

/**
 * Drafts and projects in review are visible only in `astro dev` (with a
 * banner) and are never part of a production build.
 */
export const showUnpublished = import.meta.env.DEV;

export function isPublic(project: Project): boolean {
  return project.data.publication === 'published';
}

/** Most recent first: by end date, then start date; ongoing work counts as current. */
function dateKey(project: Project): string {
  const { dates, status } = project.data;
  if (!dates?.end && (status === 'in-progress' || status === 'ongoing')) return '9999';
  return dates?.end ?? dates?.start ?? '0000';
}

export function sortProjects(a: Project, b: Project): number {
  const ao = a.data.order ?? Number.POSITIVE_INFINITY;
  const bo = b.data.order ?? Number.POSITIVE_INFINITY;
  if (ao !== bo) return ao - bo;
  return dateKey(b).localeCompare(dateKey(a)) || a.data.title.localeCompare(b.data.title);
}

/** Every project that may render in the current mode, sorted for display. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => showUnpublished || isPublic(p));
  for (const p of all) {
    // The folder name and slug must agree so URLs stay predictable.
    const folder = p.filePath?.split('/').at(-2);
    if (folder && folder !== p.data.slug) {
      throw new Error(`Project folder "${folder}" does not match its slug "${p.data.slug}".`);
    }
  }
  return all.sort(sortProjects);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

/**
 * What each capability means, in Bruce's own framing of what an employer
 * should take away. Shown only alongside projects that demonstrate it
 * (or as a placeholder in pre-launch preview mode).
 */
export const capabilityInfo: Record<(typeof CAPABILITIES)[number], { label: string; description: string }> = {
  'problem-framing': {
    label: 'Framing business problems',
    description: 'Identifying and understanding a business problem.',
  },
  'analysis-and-recommendations': {
    label: 'Analysis and recommendations',
    description: 'Analyzing information and making useful recommendations.',
  },
  'building-solutions': {
    label: 'Building practical solutions',
    description: 'Turning analysis and ideas into working tools and deliverables.',
  },
  'applied-ai': {
    label: 'Applying AI thoughtfully',
    description: 'Using AI thoughtfully and effectively.',
  },
  'tools-and-infrastructure': {
    label: 'Tools, integrations, and infrastructure',
    description: 'Understanding the tools, integrations, and infrastructure behind the work.',
  },
  'troubleshooting-and-iteration': {
    label: 'Troubleshooting and iteration',
    description: 'Making decisions, troubleshooting problems, and improving an implementation.',
  },
  'business-communication': {
    label: 'Explaining technical work clearly',
    description: 'Explaining technical work clearly to a business audience.',
  },
};

/** Every capability with the shown projects that demonstrate it (possibly none). */
export function capabilityEvidence(projects: Project[]) {
  return CAPABILITIES.map((id) => ({
    id,
    ...capabilityInfo[id],
    projects: projects.filter((p) => p.data.capabilities.includes(id)),
  }));
}

/** Capabilities that at least one shown project demonstrates. */
export function capabilitiesFrom(projects: Project[]) {
  return capabilityEvidence(projects).filter((c) => c.projects.length > 0);
}

/** Unique tools across projects, each with the projects that used it, ordered by use. */
export function toolsFrom(projects: Project[]) {
  const tools = new Map<string, { name: string; projects: Project[] }>();
  for (const project of projects) {
    for (const tool of project.data.tools) {
      const key = tool.name.toLowerCase();
      const entry = tools.get(key) ?? { name: tool.name, projects: [] };
      if (!entry.projects.includes(project)) entry.projects.push(project);
      tools.set(key, entry);
    }
  }
  return [...tools.values()].sort(
    (a, b) => b.projects.length - a.projects.length || a.name.localeCompare(b.name),
  );
}

export const contextLabels: Record<Project['data']['context']['type'], string> = {
  personal: 'Personal project',
  academic: 'Academic project',
  team: 'Team project',
  client: 'Client project',
  internship: 'Internship',
  work: 'Work project',
};

export const statusLabels: Record<Project['data']['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In progress',
  ongoing: 'Ongoing',
  prototype: 'Prototype',
  concept: 'Concept',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatPartial(value: string): string {
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

/** "Jan 2025 – May 2025", "2024", "Mar 2025 – present", or undefined. */
export function formatDates(project: Project): string | undefined {
  const { dates, status } = project.data;
  if (!dates?.start && !dates?.end) return undefined;
  const ongoing = status === 'in-progress' || status === 'ongoing';
  const start = dates.start ? formatPartial(dates.start) : undefined;
  const end = dates.end ? formatPartial(dates.end) : ongoing ? 'present' : undefined;
  if (start && end && start !== end) return `${start} – ${end}`;
  return start ?? end;
}

export function humanize(id: string): string {
  const text = id.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
}
