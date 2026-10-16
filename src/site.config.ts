/**
 * Site-wide settings and verified profile facts.
 *
 * Only add information Bruce has confirmed. Optional items left as `undefined`
 * are simply not rendered: no empty links, no placeholder buttons.
 */
export interface SiteConfig {
  name: string;
  url: string;
  /** Default meta description. Factual; homepage messaging comes later. */
  description: string;
  locale: string;
  profile: {
    program: string;
    school: string;
    minor: string;
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
  profile: {
    program: 'Business Analytics',
    school: 'Auburn University',
    minor: 'Marketing',
  },
  contact: {},
  resume: undefined,
};

/** True once at least one verified contact method exists. */
export const hasContact = Object.values(site.contact).some(Boolean);
