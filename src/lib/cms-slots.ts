// Central registry of erxes CMS category IDs used as content "slots".
// A category = a slot on the site; posts inside it are the content.
// Structure was reorganized in erxes admin — keep this file in sync with it.

export const CMS_CATEGORIES = {
  home: "ISxhb0gnJAeSuMurMI4eM", // Нүүр — homepage slots
  about: "P4sdbASXvnc32LMHUuOUO", // Бидний тухай — about page sections
  priorities: "VZM2SRBqM3AnUODJE_8X1", // Priorities — priority 1-5 sections
  vienna: "Woy3E3KS6l7FJXD5Xb701", // Vienna — lldcs-vienna sections
  awaza: "FD6RZq0PQmOzr8Y4yNiFf", // Awaza — lldcs-awaza sections
  events: "Dn6dByeptqyf4nVbU53dH", // Арга хэмжээ — event posts
  research: "7ObdTkN1eYOaI_Cfb7ydJ", // Судалгааны ангилал — research cats/docs/reports
  gallery: "YQpvuWC7F86QnOx61SaGz", // photos
  eLibrary: "ma7c-AJsMbDEodgLIM9qD", // e-library sections
  partners: "t85PQgeGpGhACNZumd15A", // Хамтрагч байгууллагууд — partner sections
  news: "94nLQX6yxQON9yMmYrFkE", // Мэдээ — news posts
  support: "U_baMHeMuooMWCFdJQEQf", // Дэмжлэг — support page sections
  contact: "VIkMzrnZS1Ppk-WXh0Q_j", // Холбоо барих мэдээлэл — contact details
  youth: "d2Xs8CPxo_G-evoqGChce", // Залуучуудын зөвлөл — youth events
  reports: "-KUsoUmpCMn3EGGzK-jGZ", // Тайлан — annual reports
} as const;

export type CmsCategoryKey = keyof typeof CMS_CATEGORIES;

// Page slug -> where its section posts live. Sections are the posts in the
// category whose title starts with titlePrefix ("Page name — Section name").
export const PAGE_SECTION_SOURCE: Record<
  string,
  { categoryKey: CmsCategoryKey; titlePrefix: string }
> = {
  "about-brief-history": { categoryKey: "about", titlePrefix: "Бидний тухай —" },
  "about-executive-greeting": {
    categoryKey: "about",
    titlePrefix: "Удирдах зөвлөлийн даргын мэндчилгээ —",
  },
  "about-goals": { categoryKey: "about", titlePrefix: "Зорилго, зорилтууд —" },
  "about-multilateral-agreement": {
    categoryKey: "about",
    titlePrefix: "Олон талт хэлэлцээр —",
  },
  "lldcs-vienna": { categoryKey: "vienna", titlePrefix: "ДГХБО - Вена —" },
  "lldcs-awaza": { categoryKey: "awaza", titlePrefix: "ДГХБО - Аваза —" },
  "priority-1": { categoryKey: "priorities", titlePrefix: "Priority 1 —" },
  "priority-2": { categoryKey: "priorities", titlePrefix: "Priority 2 —" },
  "priority-3": { categoryKey: "priorities", titlePrefix: "Priority 3 —" },
  "priority-4": { categoryKey: "priorities", titlePrefix: "Priority 4 —" },
  "priority-5": { categoryKey: "priorities", titlePrefix: "Priority 5 —" },
  "e-library": { categoryKey: "eLibrary", titlePrefix: "Цахим номын сан —" },
  "partner-institutions": {
    categoryKey: "partners",
    titlePrefix: "Хамтрагч байгууллагууд —",
  },
  support: { categoryKey: "support", titlePrefix: "Дэмжлэг —" },
};

// Homepage slots live in the "home" (Нүүр) category and are identified by
// post title.
export const HOME_HERO_TITLE = "ОЛОН УЛСЫН СУДАЛГААНЫ ТӨВ";
export const HOME_HISTORY_PREFIX = "Бидний түүх";
export const HOME_FOCUS_TITLES = [
  "Бодлогын судалгаа",
  "Олон улсын хамтын ажиллагаа",
  "Мэдээллийн төв",
];
export const HOME_QUOTE_TITLE = "Ерөнхийлөгчийн ишлэл";
export const HOME_NEWSLETTER_TITLE = "Мэдээллийн захиалга";
export const HOME_NEWS_HEADING_TITLE = "Нүүр — Мэдээний толгой";
export const HOME_YOUTH_HEADING_TITLE = "Нүүр — Залуучуудын толгой";
