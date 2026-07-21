// Local image asset paths for the luxury redesign.
// All images live in /public/images/luxury/ and can be swapped via erxes CMS later.

export const images = {
  // Heroes
  heroHome: "/images/luxury/home.jpg",
  heroResearch: "/images/luxury/research.jpg",
  heroReports: "/images/luxury/reports.jpg",
  heroAbout: "/images/luxury/about.jpg",
  heroEvents: "/images/luxury/events.jpg",
  heroContact: "/images/luxury/contact.jpg",
  heroLibrary: "/images/luxury/library.jpg",
  heroPartners: "/images/luxury/partners.jpg",
  heroPhotos: "/images/luxury/photos.jpg",
  heroSupport: "/images/luxury/support.jpg",

  // Category card backgrounds
  legal: "/images/luxury/legal.jpg",
  statistics: "/images/luxury/statistics.jpg",
  meetings: "/images/luxury/meetings.jpg",
  policy: "/images/luxury/policy.jpg",

  // Document/report card textures
  doc1: "/images/luxury/doc1.jpg",
  doc2: "/images/luxury/doc2.jpg",
  doc3: "/images/luxury/doc3.jpg",
  doc4: "/images/luxury/doc4.jpg",
  doc5: "/images/luxury/doc5.jpg",
  doc6: "/images/luxury/doc6.jpg",
  doc7: "/images/luxury/doc7.jpg",
  doc8: "/images/luxury/doc8.jpg",
} as const;

export type ImageKey = keyof typeof images;

export function getImage(key: ImageKey) {
  return images[key];
}

export function getHeroImage(slug: string): string {
  const map: Record<string, string> = {
    home: images.heroHome,
    research: images.heroResearch,
    reports: images.heroReports,
    "about-brief-history": images.heroAbout,
    "about-executive-greeting": images.heroAbout,
    "about-goals": images.heroAbout,
    "about-multilateral-agreement": images.heroAbout,
    events: images.heroEvents,
    contact: images.heroContact,
    "e-library": images.heroLibrary,
    "partner-institutions": images.heroPartners,
    photos: images.heroPhotos,
    support: images.heroSupport,
    "lldcs-vienna": images.heroAbout,
    "lldcs-awaza": images.heroAbout,
    "priority-1": images.heroReports,
    "priority-2": images.heroReports,
    "priority-3": images.heroReports,
    "priority-4": images.heroReports,
    "priority-5": images.heroReports,
    "site-map": images.heroAbout,
  };
  return map[slug] || images.heroAbout;
}

export const reportCardImages = [
  images.doc1,
  images.doc2,
  images.doc3,
  images.doc4,
  images.doc5,
  images.doc6,
  images.doc7,
  images.doc8,
];

export const documentCardImages = [
  images.doc1,
  images.doc2,
  images.doc3,
  images.doc4,
  images.doc5,
  images.doc6,
  images.doc7,
  images.doc8,
];
