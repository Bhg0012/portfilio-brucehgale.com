/**
 * Site-wide settings and verified profile facts.
 *
 * Only add information Bruce has confirmed. Optional items left as `undefined`
 * are simply not rendered: no empty links, no dead buttons.
 */
export interface SiteConfig {
  name: string;
  url: string;
  /** Default meta description. Factual; homepage messaging comes later. */
  description: string;
  locale: string;
  /**
   * Placeholder mode (pre-launch preview). When true, dashed "coming soon"
   * boxes mark where unfinished content will go, a preview banner appears,
   * a case-study layout preview is built at /preview/case-study/, and every
   * page is marked noindex. Set to false before launch; real content always
   * replaces a placeholder automatically when it exists.
   */
  placeholders: boolean;
  profile: {
    program: string;
    school: string;
    minor: string;
    /** Areas Bruce is targeting, as Bruce described them. */
    focusAreas: string[];
    /** e.g. "May 2027". Unconfirmed until Bruce provides it. */
    graduation?: string;
    /** e.g. "Auburn, AL". Unconfirmed until Bruce provides it. */
    location?: string;
  };
  contact: {
    /** Public contact email, once Bruce approves one for the site. */
    email?: string;
    /** Full LinkedIn profile URL. */
    linkedin?: string;
    /** Full GitHub profile URL. */
    github?: string;
  };
  /** Site path to an approved resume in public/downloads/, e.g. "/downloads/bruce-gale-resume.pdf". */
  resume?: string;
}

export const site: SiteConfig = {
  name: 'Bruce Gale',
  url: 'https://brucehgale.com',
  description:
    'Portfolio of Bruce Gale, a Business Analytics student at Auburn University with a minor in Marketing.',
  locale: 'en_US',
  placeholders: true,
  profile: {
    program: 'Business Analytics',
    school: 'Auburn University',
    minor: 'Marketing',
    focusAreas: ['Business analytics', 'Data', 'Marketing', 'Business operations', 'Applied AI'],
    graduation: undefined,
    location: undefined,
  },
  contact: {},
  resume: undefined,
};

/** True once at least one verified contact method exists. */
export const hasContact = Object.values(site.contact).some(Boolean);
