// Central registry of erxes CMS category IDs used as content "slots".
// A category = a slot on a page; posts inside it are the content.
// IDs come from the seeding run (see content-map.md).

export const CMS_CATEGORIES = {
  blog: "P_fvK6INwc6n8JcSrMJk4", // legacy: holds the original 15 news/event posts
  news: "fDPBSnFfS6rbdCetfxj6L", // Мэдээ
  events: "xNKx6Ayu0Pqk-S7O7gjIr", // Арга хэмжээ
  history: "8UntzskQ7S7D_lpOxURVg", // Бидний түүх
  hero: "wtGvaOlzBTNrYn9XRl10q", // Нүүр — Толгой хэсэг
  focusAreas: "j3KIVYZ6vGXEs-JWduQjk", // Үндсэн чиглэл
  quote: "S3yYRZReAX_rvjvK_auGx", // Ишлэл
  newsletter: "zDzl0KEKD4wDm2BiDtA-a", // Мэдээллийн захиалга
  youthEvents: "vmHqOVNNuttygQIztyfV0", // Залуучуудын арга хэмжээ
  researchCategories: "wn-n-jiVPRa7xkYb2zvxA", // Судалгааны ангилал
  documents: "cEX_lWey5rEUIHmJuU9v3", // Баримт бичиг
  reports: "HLY8TAEWwrLoUpoAbeuDm", // Тайлан
  gallery: "j3HTL7GxVKrpRTSiDoW0y", // Зургийн цомог
  contactInfo: "MObh3lww2B5-HtOnoIX5M", // Холбоо барих мэдээлэл
  sectionHome: "7N3YIa5Zo0i6R3YFZaQ14", // Хэсэг: Нүүр хуудас
} as const;

// Page slug -> its section category id ("Хуудасны хэсгүүд" children).
// Posts in these categories are ordered HTML sections rendered by PageBody.
export const PAGE_SECTION_CATEGORY: Record<string, string> = {
  "about-brief-history": "sc7vZ0PeNzhUopVJNK2TS",
  "about-executive-greeting": "NJ7lqvUHVQmdTTjrgHOmQ",
  "about-goals": "3NiCOomAzCL325P5tmLJW",
  "about-multilateral-agreement": "llAtQH7xh-ygvum_orOxf",
  "lldcs-vienna": "RZamyyEvOT7Z57lFRLOSV",
  "lldcs-awaza": "806vLZRwS312E-iZoit9Z",
  "priority-1": "XZZrlJ7CMWz3_ejXlgVri",
  "priority-2": "cIrny9sIzOYrogjiRxCao",
  "priority-3": "R-L4swN7e-B5zwOoPUYPp",
  "priority-4": "bSdKFQ0HAjnpqldhNTk_M",
  "priority-5": "IhhXONqWxsvf18Qb1oRvs",
  "e-library": "6c8HLmTAsIRk2U2jKQ4cp",
  "partner-institutions": "O8MG7yYiXVPMMQrgbR2E2",
  support: "PLB5znL-4SFgsnEcxZMz-",
};
