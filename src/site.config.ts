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
    /** e.g. "Honors College", once confirmed. */
    honors?: string;
    /** e.g. "B.S. in Business Administration" */
    degree?: string;
    /** e.g. "Harbert College of Business" */
    college?: string;
    gpa?: string;
    /** Organizations and activities, e.g. "Delta Sigma Pi". */
    activities?: { name: string; detail?: string }[];
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
  /**
   * Homepage positioning: one or two plain sentences, built only from facts
   * in the published projects and experience. Bruce approves the wording.
   */
  headline?: string;
  /**
   * Key numbers shown under the homepage hero. Each one must already appear,
   * with evidence, in the project or profile it links to.
   */
  highlights?: { value: string; label: string; href: string }[];
  /** Site path to an approved resume in public/downloads/, e.g. "/downloads/bruce-gale-resume.pdf". */
  resume?: string;
}

export const site: SiteConfig = {
  name: 'Bruce Gale',
  url: 'https://brucehgale.com',
  description:
    'Portfolio of Bruce Gale, a Business Analytics student in the Auburn University Honors College with a minor in Marketing.',
  locale: 'en_US',
  placeholders: false,
  profile: {
    program: 'Business Analytics',
    school: 'Auburn University',
    minor: 'Marketing',
    honors: 'Honors College',
    degree: 'B.S. in Business Administration',
    college: 'Harbert College of Business',
    gpa: '4.0',
    activities: [{ name: 'Delta Sigma Pi', detail: 'Professional business fraternity' }],
    focusAreas: ['Business analytics', 'Data', 'Marketing', 'Business operations', 'Applied AI'],
    graduation: 'May 2027',
    location: 'Auburn, Alabama',
  },
  contact: {
    email: 'brhgale@gmail.com',
    linkedin: 'https://www.linkedin.com/in/brucegale25/',
  },
  headline:
    'I founded and run AuburnSEO, a local marketing agency for Alabama contractors, where I use AI and automation to build sites, create ads, and follow up with every lead. I also do digital marketing at Octave and study Business Analytics in the Honors College.',
  resume: undefined,
};

/** True once at least one verified contact method exists. */
export const hasContact = Object.values(site.contact).some(Boolean);
