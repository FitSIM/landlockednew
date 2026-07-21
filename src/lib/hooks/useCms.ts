"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useQuery } from "@apollo/client/react";
import {
  CP_MENUS,
  CP_PAGES,
  CP_POST,
  CP_POST_LIST,
} from "@/graphql/cms/queries";
import type {
  CpMenusData,
  CpPagesData,
  CpPostData,
  CpPostListData,
  MenuItem,
  Post,
} from "@/graphql/cms/queries";
import { CMS_CATEGORIES } from "@/lib/cms-slots";

// Client-side CMS data layer: every hook queries erxes from the browser
// (through the ApolloProvider client) and falls back to the static snapshots
// served from public/ when erxes is unreachable or has no matching content.
// Queries are skipped until after hydration so the static shell renders
// data-free and all fetching is visible in the browser's Network tab.

const LANGUAGE = "en";

// News/event posts live in the legacy "Blog" category; the dedicated
// "Мэдээ" (news) and "Арга хэмжээ" (events) categories hold future posts.
const BLOG_CATEGORY_ID = CMS_CATEGORIES.blog;

// Re-seeding the CMS gave colliding slugs a numeric suffix ("home" → "home_3"),
// so match the bare slug first, then a suffixed variant.
function matchesSlug(candidate: string | undefined, slug: string) {
  return candidate === slug || candidate?.replace(/_\d+$/, "") === slug;
}

const emptySubscribe = () => () => {};

// erxes returns customFieldsData as an array of { field, value } pairs
// (older entries may be a plain object) — normalize to a string record.
export function fieldsOf(post: Post): Record<string, string> {
  const raw = post.customFieldsData as unknown;
  if (Array.isArray(raw)) {
    const out: Record<string, string> = {};
    for (const entry of raw as { field?: unknown; value?: unknown }[]) {
      if (entry && entry.field != null) {
        out[String(entry.field)] = entry.value == null ? "" : String(entry.value);
      }
    }
    return out;
  }
  return (raw ?? {}) as Record<string, string>;
}

// true after hydration, false during SSR/prerender — keeps the static shell
// data-free so every CMS request happens in the browser.
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function usePageContent(slug: string) {
  const mounted = useMounted();
  const { data, error, loading } = useQuery<CpPagesData>(CP_PAGES, {
    variables: { language: LANGUAGE },
    skip: !mounted,
  });

  const cmsHtml = data?.cpPages?.find((p) => matchesSlug(p.slug, slug))?.content;
  const needFallback = mounted && !loading && !cmsHtml && Boolean(error || data);

  // undefined = not fetched yet, null = fallback missing too
  const [fallback, setFallback] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (!needFallback) return;
    let alive = true;
    fetch(`/page-body/${slug}.html`)
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => alive && setFallback(text))
      .catch(() => alive && setFallback(null));
    return () => {
      alive = false;
    };
  }, [needFallback, slug]);

  return {
    html: cmsHtml ?? (needFallback ? (fallback ?? null) : null),
    loading: !mounted || loading || (needFallback && fallback === undefined),
  };
}

export function usePosts(type: string) {
  const mounted = useMounted();
  const dedicatedCategory =
    type === "news" ? CMS_CATEGORIES.news : type === "event" ? CMS_CATEGORIES.events : null;
  const { data, error, loading } = useQuery<CpPostListData>(CP_POST_LIST, {
    variables: {
      categoryIds: [BLOG_CATEGORY_ID, ...(dedicatedCategory ? [dedicatedCategory] : [])],
      status: "published",
      language: LANGUAGE,
      limit: 50,
    },
    skip: !mounted,
  });

  // Legacy Blog posts carry type "post"; news vs event is distinguished by
  // the slug prefix ("news-*" / "event-*"). Posts filed directly in the
  // dedicated news/events category count without the prefix requirement.
  const prefix = `${type}-`;
  const cmsPosts = data?.cpPostList?.posts?.filter(
    (p) =>
      p.slug?.startsWith(prefix) ||
      (dedicatedCategory &&
        p.categories?.some((c) => c._id === dedicatedCategory)),
  );
  const needFallback =
    mounted && !loading && (Boolean(error) || cmsPosts?.length === 0);

  const [fallback, setFallback] = useState<Post[] | undefined>(undefined);
  useEffect(() => {
    if (!needFallback) return;
    let alive = true;
    fetch("/fallback/posts.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((all: Post[]) =>
        alive && setFallback(all.filter((p) => p.type === type)),
      )
      .catch(() => alive && setFallback([]));
    return () => {
      alive = false;
    };
  }, [needFallback, type]);

  return {
    posts: (needFallback ? fallback : cmsPosts) ?? [],
    loading: !mounted || loading || (needFallback && fallback === undefined),
  };
}

export function usePost(slug: string, type: string) {
  const mounted = useMounted();
  const { data, error, loading } = useQuery<CpPostData>(CP_POST, {
    variables: { slug, language: LANGUAGE },
    skip: !mounted,
  });

  const needFallback = mounted && !loading && Boolean(error);

  const [fallback, setFallback] = useState<Post | null | undefined>(undefined);
  useEffect(() => {
    if (!needFallback) return;
    let alive = true;
    fetch("/fallback/posts.json")
      .then((r) => (r.ok ? r.json() : []))
      .then(
        (all: Post[]) =>
          alive &&
          setFallback(
            all.find((p) => p.slug === slug && p.type === type) ?? null,
          ),
      )
      .catch(() => alive && setFallback(null));
    return () => {
      alive = false;
    };
  }, [needFallback, slug, type]);

  const stillLoading =
    !mounted || loading || (needFallback && fallback === undefined);

  // undefined while loading, null once we know the post doesn't exist
  const post = error ? fallback : (data?.cpPost ?? (stillLoading ? undefined : null));

  return { post, loading: stillLoading };
}

export function useMenus(kind: string, language: string = LANGUAGE) {
  const mounted = useMounted();
  const { data } = useQuery<CpMenusData>(CP_MENUS, {
    variables: { language, kind },
    skip: !mounted,
  });
  return (data?.cpMenus ?? []) as MenuItem[];
}

export function usePageName(slug: string) {
  const mounted = useMounted();
  const { data } = useQuery<CpPagesData>(CP_PAGES, {
    variables: { language: LANGUAGE },
    skip: !mounted,
  });
  const cmsName = data?.cpPages?.find((p) => matchesSlug(p.slug, slug))?.name;

  const [fallbackName, setFallbackName] = useState(slug.replace(/-/g, " "));
  useEffect(() => {
    let alive = true;
    fetch("/fallback/pages.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((pages: { slug: string; name: string }[]) => {
        const found = pages.find((p) => p.slug === slug)?.name;
        if (alive && found) setFallbackName(found);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug]);

  return cmsName ?? fallbackName;
}

// Full CMS page object for a slug (name, description, content).
export function usePage(slug: string) {
  const mounted = useMounted();
  const { data, loading } = useQuery<CpPagesData>(CP_PAGES, {
    variables: { language: LANGUAGE },
    skip: !mounted,
  });
  const page = data?.cpPages?.find((p) => matchesSlug(p.slug, slug)) ?? null;
  return { page, loading: !mounted || loading };
}

// Posts of one slot category, ordered by customFieldsData.order (fallback:
// creation order). Used for section posts, documents, gallery, youth events.
export function useSlotPosts(categoryId: string | undefined) {
  const mounted = useMounted();
  const { data, error, loading } = useQuery<CpPostListData>(CP_POST_LIST, {
    variables: {
      categoryIds: [categoryId ?? ""],
      status: "published",
      language: LANGUAGE,
      limit: 100,
    },
    skip: !mounted || !categoryId,
  });

  const posts = (data?.cpPostList?.posts ?? []).slice().sort((a, b) => {
    const orderA = Number(fieldsOf(a).order ?? 0);
    const orderB = Number(fieldsOf(b).order ?? 0);
    if (orderA !== orderB) return orderA - orderB;
    return String(a.createdAt ?? "").localeCompare(String(b.createdAt ?? ""));
  });

  return { posts, loading: !mounted || loading, error };
}

// Ordered section posts of a page, concatenated into one HTML blob so the
// rendered DOM matches the original monolithic page markup exactly (all
// existing pencil-page CSS selectors keep working). Returns undefined while
// loading, null when the slot has no posts (caller falls back to the page
// content / static snapshot chain).
export function useSectionHtml(categoryId: string | undefined) {
  const { posts, loading, error } = useSlotPosts(categoryId);

  if (!categoryId) return { html: null, loading: false };
  if (loading) return { html: undefined, loading: true };
  if (error || posts.length === 0) return { html: null, loading: false };
  return { html: posts.map((p) => p.content ?? "").join("\n"), loading: false };
}
