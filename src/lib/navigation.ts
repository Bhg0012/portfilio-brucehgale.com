import { getProjects } from './projects';
import { hasContact, site } from '../site.config';

export interface NavLink {
  href: string;
  label: string;
}

/**
 * Main navigation. A link appears only when its destination has real content,
 * or, in placeholder mode, a page that shows where that content will go.
 */
export async function getNavLinks(): Promise<NavLink[]> {
  const hasProjects = (await getProjects()).length > 0;
  return [
    (hasProjects || site.placeholders) && { href: '/work/', label: 'Work' },
    { href: '/about/', label: 'About' },
    (hasContact || site.placeholders) && { href: '/contact/', label: 'Contact' },
  ].filter((l): l is NavLink => Boolean(l));
}
