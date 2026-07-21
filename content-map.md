# LandLockedMN — Section-by-Section Content Map

Purpose: every section of every page mapped to its future erxes CMS slot before any seeding.
Pattern (validated by the hero example): **a category is a slot on the page, posts are the content in that slot.** Text blocks = plain posts (title + content). Structured data = posts with `customFieldsData` via a CustomFieldGroup. Pure UI labels (buttons, filter chips) stay in code.

Naming convention for slot categories: stable English slugs, Mongolian display names.

---

## 1. Homepage `/`

Currently: live hero post + one monolithic CMS page (`home_3`, 56 KB of HTML). The news titles and youth events are baked into that HTML as static text — they duplicate real posts and will go stale. The homepage should be recomposed as sections, each fed live.

| # | Section | Current source | Proposed erxes slot | Type |
|---|---------|---------------|---------------------|------|
| 1 | Hero (title + paragraph + CTA) | LIVE: post `olon-ulsyn-sudalgaany-tuv` in category `test` | Move to category **`hero`** (Нүүр — толгой хэсэг). 1 post: title = heading, content = paragraph | Post |
| 2 | Бидний түүх teaser | Static inside `home_3` HTML | Post `bidnii-tuukh` already exists in category **Бидний түүх** — wire the section to it | Post (exists) |
| 3 | Focus areas — 3 cards (Бодлогын судалгаа / Олон улсын хамтын ажиллагаа / Мэдээллийн төв) | Static inside `home_3` HTML | Category **`focus-areas`** (Үндсэн чиглэл), 3 posts: title = card title, content = card text, customField `icon`, `linkUrl` | Posts + custom fields |
| 4 | Онцлох мэдээ (1 featured + 4 list) | Static titles inside `home_3` HTML — duplicates real posts | Live from **news** category; featured card = post with `featured: true`, list = latest 4 | Posts (exist) |
| 5 | Quote (Монгол Улсын Ерөнхийлөгч, Хавана 2006) | Static inside `home_3` HTML | Category **`quote`** (Ишлэл), 1 post: content = quote text, customField `attribution` | Post + custom field |
| 6 | Залуучуудын зөвлөл teaser (6 events with cities) | Static inside `home_3` HTML — duplicates youth events | Live from **youth-events** category (see Youth Advisory page below) | Posts (to be seeded) |
| 7 | Мэдээллийн захиалга (newsletter blurb) | Static inside `home_3` HTML | Category **`newsletter`** (Мэдээллийн захиалга), 1 post: title + content; form logic stays in code | Post |

Result: `home_3` monolith is retired; the homepage becomes a section composition. (The old page entry can stay in erxes unused, or be archived.)

## 2. Standalone content pages (rendered via PageBody — already page-driven)

These work today: body = CMS page HTML, hero title = live page name. Only the decorative eyebrow/body in the hero is hardcoded.

| Route | CMS page | Gap |
|-------|----------|-----|
| `/about-brief-history` | `about-brief-history_3` ✓ | hero eyebrow/body hardcoded → move to page `description` field |
| `/about-executive-greeting` | ✓ | same |
| `/about-goals` | ✓ | same |
| `/about-multilateral-agreement` | ✓ | same |
| `/lldcs-vienna` | ✓ | hero copy in LLDCHero hardcoded → page `description` |
| `/lldcs-awaza` | ✓ | same |
| `/priority-1` … `/priority-5` | ✓ (5 pages) | PriorityHero titles hardcoded → page `description` |
| `/e-library` | ✓ | hero eyebrow → page `description` |
| `/partner-institutions` | ✓ | same |
| `/support` | **MISSING in erxes** — route renders from local fallback only | Create page `support` |
| `/youth-advisory` | Page exists but **content is empty** (len=0) | Fill or leave — page body comes from component sections anyway |

## 3. Component-driven pages (CMS page exists but is bypassed / needs section posts)

| Route | Section | Current source | Proposed slot |
|-------|---------|---------------|---------------|
| `/news` | hero copy | hardcoded in NewsListClient | Create page `news` — title/description feed hero |
| `/news` | article list + detail pages | **LIVE** (8 posts) | Move to category **`news`** (Мэдээ — already exists, empty) |
| `/events` | hero copy + section copy | hardcoded in EventsClient | Page `events_3` exists — use its description |
| `/events` | event list + detail pages | **LIVE** (7 posts) | Move to category **`events`** (Арга хэмжээ — new) |
| `/research` | 4 category cards | hardcoded | Category **`research-categories`**, 4 posts |
| `/research` | 16 documents (title + "2024.09.30 • PDF • 890 KB") | hardcoded | Category **`documents`** (Баримт бичиг), 16 posts + CustomFieldGroup **`documentMeta`** (`fileUrl`, `fileSize`, `fileType`, `date`, `group`) |
| `/research` | 3 report cards | hardcoded | Category **`research-reports`**, 3 posts (or fold into `documents`) |
| `/reports` | 17 year cards (2009–2025) | generated in code | Category **`reports`** (Тайлан), 1 post per year + `documentMeta.year`; years without content simply have no post |
| `/photos` | featured photo story | hardcoded | Category **`gallery`** (Зургийн цомог), posts with `thumbnail`/`images`; featured = `featured: true` |
| `/photos` | 8 gallery items | hardcoded | same `gallery` category, 8 posts |
| `/contact` | contact info (address, phone, email, social) | hardcoded ×2 (also duplicated in Footer) | CustomFieldGroup **`contactMeta`** on page `contact_3` (`address`, `phone`, `email`, `social`) — single source for both Contact page and Footer |
| `/contact` | form fields | hardcoded labels | Keep in code (form logic) — flag if you want them editable |
| `/youth-advisory` | latest updates (3) | **LIVE** (news-youth-* posts) | — |
| `/youth-advisory` | 6 youth events (title, tag, body, location, date, fullInfo, outcomes[], speakers[], schedule[]) | hardcoded | Category **`youth-events`** (Залуучуудын арга хэмжээ), 6 posts + CustomFieldGroup **`eventMeta`** (`date`, `location`, `tag`, `fullInfo`, `outcomes`, `speakers`, `schedule`) |
| `/site-map` | news/event groups | **LIVE** | — |

## 4. Layout / global

| Piece | Current | Proposed |
|-------|---------|----------|
| Header nav | **LIVE** (`cpMenus kind=header`) | — |
| Footer link labels | **LIVE** (`cpMenus kind=footer`) | — |
| Footer contact block + org description | hardcoded | Same `contactMeta` source as /contact |
| Footer social links | hardcoded `#` | `contactMeta` (`facebookUrl`, `twitterUrl`, …) — or keep in code if never changing |
| Site metadata (title/description in layout) | hardcoded | Keep in code — flag: could be a `settings` page if wanted |

## 5. Stays in code (not content)

Button labels (Дэлгэрэнгүй, Бүртгүүлэх, Хуваалцах), filter chips, search placeholder, social icons, footer group titles, copyright line. Putting these in CMS adds fragility with no editorial benefit.

---

## Proposed new erxes structure

**New categories (slots):** `hero`, `focus-areas`, `quote`, `newsletter`, `news` (exists as Мэдээ, empty), `events`, `youth-events`, `research-categories`, `documents`, `reports`, `gallery`
**Repurpose:** `test` → `hero` (create `hero`, move the post, retire `test`); `Blog` → split into `news` + `events`
**New CustomFieldGroups:** `eventMeta`, `documentMeta`, `contactMeta` (+ `focusMeta`/`quoteMeta` — small, can share one `sectionMeta` group if preferred)
**New posts to seed:** ~45 (3 focus + 1 quote + 1 newsletter + 4 research cats + 16 documents + 3 research reports + up to 17 report years + 9 gallery + 6 youth events)
**New pages:** `news`, `support`; fill `youth-advisory` or leave empty
**Frontend after seeding:** homepage recomposed into live sections; ResearchPage, ReportsPage, PhotosPage, ContactPage, youth events wired to the slots above; fallback architecture preserved everywhere (live first, static snapshot only on error/empty).

## Open questions for review

1. Reports: seed one post per year (2009–2025) even where there's no real document yet, or only years that have actual reports?
2. The 6 youth events are invented placeholder content — seed them as-is, or will you provide real youth event data first?
3. Gallery: are there real photos to upload to erxes, or seed with the existing local images as external URLs?
4. Language: everything is Mongolian-only today while the site locale is `en`. Proper `mn`/`en` translations (via `cpCmsAddTranslation`) are a separate workstream — include now or later?
