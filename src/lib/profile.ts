import portrait from '../assets/profile/bruce-gale-portrait.jpg';
import { site } from '../site.config';

/** Bruce's approved headshot (EXIF metadata stripped before committing). */
export const profilePhoto = {
  src: portrait,
  alt: `Portrait of ${site.name}`,
};
