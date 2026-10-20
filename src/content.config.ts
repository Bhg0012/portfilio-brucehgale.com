/**
 * Project content model: the single source of truth for project data.
 *
 * Each project lives in `content/projects/<slug>/index.md`, with its approved
 * images beside it in `content/projects/<slug>/images/`. Frontmatter holds the
 * structured, scannable facts; the Markdown body holds the narrative.
 *
 * Field-by-field guidance: docs/content-model.md
 * Blank starting file:     docs/project-template.md
 *
 * Every field beyond the core identity fields is optional. The site renders a
 * section only when its data exists, so missing information never becomes an
 * empty heading or invented copy.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Kinds of work. Used for grouping and, if the collection grows, filtering. */
export const CATEGORIES = [
  'data-analysis',
  'dashboard',
  'marketing-campaign',
  'market-research',
  'strategy',
  'operations',
  'website',
  'application',
  'ai-tool',
  'automation',
] as const;

/**
 * The capabilities an employer should be able to see demonstrated.
 * A project should claim only the capabilities its content actually shows.
 */
export const CAPABILITIES = [
  'problem-framing',
  'analysis-and-recommendations',
  'building-solutions',
  'applied-ai',
  'tools-and-infrastructure',
  'troubleshooting-and-iteration',
  'business-communication',
] as const;

/**
 * Where a tool sits in the work. These areas keep distinctions explicit:
 * source-control vs. app-hosting vs. data-storage, and ai-assist (AI that
 * helped build or analyze) vs. ai-runtime (AI operating inside the result).
 */
export const TOOL_AREAS = [
  'language',
  'analysis',
  'visualization',
  'data-storage',
  'integration',
  'automation',
  'source-control',
  'app-hosting',
  'ai-runtime',
  'ai-assist',
  'design',
  'marketing',
  'research',
  'collaboration',
  'other',
] as const;

export const AI_TECHNIQUES = [
  'prompt-design',
  'context-handling',
  'retrieval',
  'structured-output',
  'tool-use',
  'orchestration',
  'evaluation',
] as const;

/** Partial dates are allowed so we never imply more precision than we have. */
const partialDate = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Use YYYY or YYYY-MM');

const nonEmpty = z.string().trim().min(1);

const projects = defineCollection({
  loader: glob({ base: './content/projects', pattern: '*/index.md' }),
  schema: ({ image }) =>
    z
      .object({
        // ── Identity ────────────────────────────────────────────────
        title: nonEmpty,
        /** Stable URL slug. Must match the folder name. Never change once published. */
        slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Lowercase words separated by hyphens'),
        /** One or two sentences for cards, search results, and link previews. */
        summary: nonEmpty.max(220),
        /** Optional longer lede shown at the top of the project page. */
        overview: nonEmpty.optional(),

        // ── Editorial readiness (separate from completion status) ──
        /**
         * draft     – being written; never rendered in production
         * review    – written, awaiting Bruce's accuracy check; never rendered in production
         * published – approved for the public site
         */
        publication: z.enum(['draft', 'review', 'published']).default('draft'),
        /** Show on the homepage "Selected work" list. */
        featured: z.boolean().default(false),
        /** Lower numbers appear first. Unordered projects sort by date. */
        order: z.number().int().optional(),

        // ── Classification ─────────────────────────────────────────
        categories: z.array(z.enum(CATEGORIES)).min(1),
        capabilities: z.array(z.enum(CAPABILITIES)).default([]),
        /** Free-form skill keywords (e.g. "Regression", "SEO"). */
        tags: z.array(nonEmpty).default([]),

        // ── Context ────────────────────────────────────────────────
        context: z.object({
          type: z.enum(['personal', 'academic', 'team', 'client', 'internship', 'work']),
          /** Organization, client, or employer, only if approved for public naming. */
          organization: nonEmpty.optional(),
          /** Course name/number for academic work. */
          course: nonEmpty.optional(),
          teamSize: z.number().int().positive().optional(),
        }),
        dates: z
          .object({
            start: partialDate.optional(),
            end: partialDate.optional(),
          })
          .optional(),
        /** Completion status of the work itself (not of the write-up). */
        status: z.enum(['completed', 'in-progress', 'ongoing', 'prototype', 'concept']),

        // ── Contribution ───────────────────────────────────────────
        /** Bruce's role, e.g. "Lead analyst" or "Sole developer". */
        role: nonEmpty.optional(),
        /** Specific things Bruce personally did. Required before publishing. */
        contributions: z.array(nonEmpty).default([]),

        // ── Problem framing ────────────────────────────────────────
        problem: z
          .object({
            statement: nonEmpty.optional(),
            audience: nonEmpty.optional(),
            objectives: z.array(nonEmpty).default([]),
            constraints: z.array(nonEmpty).default([]),
          })
          .optional(),

        // ── Results ────────────────────────────────────────────────
        results: z
          .array(
            z
              .object({
                text: nonEmpty,
                /**
                 * measured    – a number or verifiable metric (requires `evidence`)
                 * qualitative – feedback, adoption, recognition
                 * delivered   – a concrete deliverable that was produced
                 */
                kind: z.enum(['measured', 'qualitative', 'delivered']),
                /** Public-facing description of what supports the claim. */
                evidence: nonEmpty.optional(),
                href: z.url().optional(),
              })
              .refine((r) => r.kind !== 'measured' || r.evidence, {
                message: 'Measured results must cite public-facing evidence',
                path: ['evidence'],
              }),
          )
          .default([]),

        // ── Tools: what each one actually did ──────────────────────
        tools: z
          .array(
            z.object({
              name: nonEmpty,
              area: z.enum(TOOL_AREAS),
              /** What Bruce did with this tool in this project. */
              purpose: nonEmpty,
            }),
          )
          .default([]),

        // ── AI: development assistance vs. runtime implementation ──
        ai: z
          .object({
            /** How AI helped Bruce plan, build, analyze, or write. */
            assistance: nonEmpty.optional(),
            /** AI operating inside the finished project. */
            runtime: z
              .object({
                summary: nonEmpty,
                deployment: z.enum(['local', 'hosted-api', 'hybrid']).optional(),
                techniques: z.array(z.enum(AI_TECHNIQUES)).default([]),
                /** Cost, privacy, reliability, performance, or quality tradeoffs. */
                tradeoffs: z
                  .array(
                    z.object({
                      topic: z.enum(['cost', 'privacy', 'reliability', 'performance', 'quality']),
                      note: nonEmpty,
                    }),
                  )
                  .default([]),
              })
              .optional(),
          })
          .optional(),

        // ── Visuals ────────────────────────────────────────────────
        cover: z
          .object({
            src: image(),
            alt: nonEmpty,
          })
          .optional(),
        figures: z
          .array(
            z.object({
              src: image(),
              alt: nonEmpty,
              caption: nonEmpty.optional(),
            }),
          )
          .default([]),

        // ── Links ──────────────────────────────────────────────────
        links: z
          .array(
            z.object({
              kind: z.enum(['repository', 'demo', 'report', 'presentation', 'dashboard', 'article', 'other']),
              label: nonEmpty,
              /** External URL, or a site path such as /downloads/<slug>/report.pdf */
              href: z.union([z.url(), z.string().regex(/^\/[^/]/)]),
            }),
          )
          .default([]),

        // ── Reflection ─────────────────────────────────────────────
        reflection: z
          .object({
            lessons: z.array(nonEmpty).default([]),
            limitations: z.array(nonEmpty).default([]),
            improvements: z.array(nonEmpty).default([]),
          })
          .optional(),

        // ── SEO overrides ──────────────────────────────────────────
        seo: z
          .object({
            title: nonEmpty.optional(),
            description: nonEmpty.max(160).optional(),
          })
          .optional(),
      })
      .refine((p) => p.publication !== 'published' || p.contributions.length > 0, {
        message: 'Published projects must list at least one specific contribution',
        path: ['contributions'],
      }),
});

/**
 * Work history: jobs, internships, and businesses Bruce founded.
 * One file per role in `content/experience/<slug>.md` (frontmatter only).
 * Logos go in `content/experience/logos/`.
 */
const experience = defineCollection({
  loader: glob({ base: './content/experience', pattern: '*.md' }),
  schema: ({ image }) =>
    z.object({
      organization: nonEmpty,
      role: nonEmpty,
      type: z.enum(['founder', 'internship', 'part-time', 'full-time', 'contract', 'volunteer', 'leadership']),
      /** "Huntsville, AL" or "Remote". */
      location: nonEmpty.optional(),
      start: partialDate.optional(),
      end: partialDate.optional(),
      /** Still in this role. */
      current: z.boolean().default(false),
      /** Square logo; omit to show the organization's initials. */
      logo: image().optional(),
      url: z.url().optional(),
      highlights: z.array(nonEmpty).default([]),
      skills: z.array(nonEmpty).default([]),
      /** Slugs of related projects; linked only when the project is published. */
      projects: z.array(z.string()).default([]),
    }),
});

export const collections = { projects, experience };
