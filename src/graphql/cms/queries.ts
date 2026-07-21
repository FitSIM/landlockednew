import { gql } from "@apollo/client";

// Shared across the entity sections below (deduped on merge).
export type PageInfo = {
  cursor?: string;
  totalCount?: number;
};

export type Attachment = {
  name: string;
  url: string;
  type: string;
  size: number;
};

export type PostTag = {
  _id: string;
  clientPortalId?: string;
  name?: string;
  slug?: string;
  colorCode?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PostCategory = {
  _id: string;
  clientPortalId?: string;
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  status?: CategoryStatus;
  parent?: PostCategory;
  customFieldsData?: Record<string, unknown>;
  customFieldsMap?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

// ============ category ============
export type CategoryStatus = "active" | "inactive";

export type PostCategoryListResponse = {
  list: PostCategory[];
  totalCount: number;
  pageInfo: PageInfo;
};

const CATEGORY_FRAGMENT = gql`
  fragment CategoryFields on PostCategory {
    _id
    clientPortalId
    name
    slug
    description
    parentId
    status
    parent {
      _id
      name
      slug
    }
    customFieldsData
    createdAt
    updatedAt
  }
`;

export const CP_CATEGORIES = gql`
  ${CATEGORY_FRAGMENT}
  query CpCategories($clientPortalId: String, $language: String) {
    cpCategories(clientPortalId: $clientPortalId, language: $language) {
      list {
        ...CategoryFields
      }
      totalCount
      pageInfo {
        cursor
        totalCount
      }
    }
  }
`;

export type CpCategoriesVariables = {
  clientPortalId?: string;
  language?: string;
};

export type CpCategoriesData = {
  cpCategories: PostCategoryListResponse;
};

// ============ customPostType ============
export type CustomPostType = {
  _id: string;
  clientPortalId: string;
  code: string;
  label: string;
  pluralLabel: string;
  description?: string;
  createdAt?: string;
};

export type CustomFieldGroup = {
  _id: string;
  clientPortalId: string;
  parentId?: string;
  label: string;
  code?: string;
  order?: number;
  customPostTypeIds?: string[];
  customPostTypes?: CustomPostType[];
  enabledPageIds?: string[];
  enabledCategoryIds?: string[];
  enabledPostIds?: string[];
  fields?: Record<string, unknown>;
  createdAt?: string;
};

const CUSTOM_POST_TYPE_FRAGMENT = gql`
  fragment CustomPostTypeFields on CustomPostType {
    _id
    clientPortalId
    code
    label
    pluralLabel
    description
    createdAt
  }
`;

const CUSTOM_FIELD_GROUP_FRAGMENT = gql`
  ${CUSTOM_POST_TYPE_FRAGMENT}
  fragment CustomFieldGroupFields on CustomFieldGroup {
    _id
    clientPortalId
    parentId
    label
    code
    order
    customPostTypeIds
    customPostTypes {
      ...CustomPostTypeFields
    }
    enabledPageIds
    enabledCategoryIds
    enabledPostIds
    fields
    createdAt
  }
`;

export const CP_CUSTOM_POST_TYPES = gql`
  ${CUSTOM_POST_TYPE_FRAGMENT}
  query CpCustomPostTypes($searchValue: String) {
    cpCustomPostTypes(searchValue: $searchValue) {
      ...CustomPostTypeFields
    }
  }
`;

export type CpCustomPostTypesVariables = {
  searchValue?: string;
};

export type CpCustomPostTypesData = {
  cpCustomPostTypes: CustomPostType[];
};

export const CP_CUSTOM_FIELD_GROUPS = gql`
  ${CUSTOM_FIELD_GROUP_FRAGMENT}
  query CpCustomFieldGroups(
    $searchValue: String
    $pageId: String
    $categoryId: String
    $postType: String
    $postId: String
  ) {
    cpCustomFieldGroups(
      searchValue: $searchValue
      pageId: $pageId
      categoryId: $categoryId
      postType: $postType
      postId: $postId
    ) {
      ...CustomFieldGroupFields
    }
  }
`;

export type CpCustomFieldGroupsVariables = {
  searchValue?: string;
  pageId?: string;
  categoryId?: string;
  postType?: string;
  postId?: string;
};

export type CpCustomFieldGroupsData = {
  cpCustomFieldGroups: CustomFieldGroup[];
};

// ============ menu ============
export type MenuItem = {
  _id: string;
  clientPortalId: string;
  webId?: string;
  parentId?: string;
  parent?: MenuItem;
  label?: string;
  contentType?: string;
  contentTypeId?: string;
  kind?: string;
  icon?: string;
  url?: string;
  order?: number;
  target?: string;
};

const MENU_ITEM_FRAGMENT = gql`
  fragment MenuItemFields on MenuItem {
    _id
    clientPortalId
    webId
    parentId
    label
    contentType
    contentTypeId
    kind
    icon
    url
    order
    target
  }
`;

export const CP_MENUS = gql`
  ${MENU_ITEM_FRAGMENT}
  query CpMenus($language: String, $kind: String, $webId: String) {
    cpMenus(language: $language, kind: $kind, webId: $webId) {
      ...MenuItemFields
      parent {
        ...MenuItemFields
      }
    }
  }
`;

export type CpMenusVariables = {
  language?: string;
  kind?: string;
  webId?: string;
};

export type CpMenusData = {
  cpMenus: MenuItem[];
};

export const CP_CMS_MENU_LIST = gql`
  ${MENU_ITEM_FRAGMENT}
  query CpCmsMenuList(
    $clientPortalId: String
    $kind: String
    $language: String
    $cursor: String
    $limit: Int
  ) {
    cpCmsMenuList(
      clientPortalId: $clientPortalId
      kind: $kind
      language: $language
      cursor: $cursor
      limit: $limit
    ) {
      ...MenuItemFields
      parent {
        ...MenuItemFields
      }
    }
  }
`;

export type CpCmsMenuListVariables = {
  clientPortalId?: string;
  kind?: string;
  language?: string;
  cursor?: string;
  limit?: number;
};

export type CpCmsMenuListData = {
  cpCmsMenuList: MenuItem[];
};

// ============ page ============
export type PageItem = {
  _id: string;
  name?: string;
  type?: string;
  content?: string;
  order?: number;
  objectType?: string;
  objectId?: string;
  config?: Record<string, unknown>;
};

export type Page = {
  _id: string;
  clientPortalId: string;
  name?: string;
  slug?: string;
  description?: string;
  content?: string;
  status?: string;
  type?: string;
  parentId?: string;
  thumbnail?: Attachment;
  pageImages?: Attachment[];
  videoUrl?: string;
  pageItems?: PageItem[];
  customFieldsData?: Record<string, unknown>;
  customFieldsMap?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export type PageList = {
  pages: Page[];
  totalCount: number;
  pageInfo: PageInfo;
};

const PAGE_FRAGMENT = gql`
  fragment PageFields on Page {
    _id
    clientPortalId
    name
    slug
    description
    content
    status
    type
    parentId
    thumbnail {
      name
      url
      type
      size
    }
    pageImages {
      name
      url
      type
      size
    }
    videoUrl
    pageItems {
      _id
      name
      type
      content
      order
      objectType
      objectId
      config
    }
    customFieldsData
    createdAt
    updatedAt
  }
`;

export const CP_PAGES = gql`
  ${PAGE_FRAGMENT}
  query CpPages($language: String) {
    cpPages(language: $language) {
      ...PageFields
    }
  }
`;

export type CpPagesVariables = {
  language?: string;
};

export type CpPagesData = {
  cpPages: Page[];
};

export const CP_PAGE_LIST = gql`
  ${PAGE_FRAGMENT}
  query CpPageList($language: String, $cursor: String, $limit: Int) {
    cpPageList(language: $language, cursor: $cursor, limit: $limit) {
      pages {
        ...PageFields
      }
      totalCount
      pageInfo {
        cursor
        totalCount
      }
    }
  }
`;

export type CpPageListVariables = {
  language?: string;
  cursor?: string;
  limit?: number;
};

export type CpPageListData = {
  cpPageList: PageList;
};

// ============ post ============
export type PostStatus = "draft" | "published" | "scheduled" | "archived";
export type PostDateField = "createdAt" | "updatedAt" | "scheduledDate" | "publishedDate";
export type PostReactionType = "like" | "love" | "angry" | "sad" | "happy";

export type Post = {
  _id: string;
  type?: string;
  webId?: string;
  clientPortalId: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categoryIds?: string[];
  categories?: PostCategory[];
  tagIds?: string[];
  tags?: PostTag[];
  status?: PostStatus;
  featured?: boolean;
  featuredDate?: string;
  scheduledDate?: string;
  publishedDate?: string;
  autoArchiveDate?: string;
  viewCount?: number;
  reactionCounts?: Record<string, number>;
  thumbnail?: Attachment;
  images?: Attachment[];
  videoUrl?: string;
  customFieldsData?: Record<string, unknown>;
  customFieldsMap?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
};

export type PostList = {
  posts: Post[];
  totalCount: number;
  pageInfo: PageInfo;
};

const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    _id
    type
    webId
    clientPortalId
    title
    slug
    excerpt
    content
    status
    featured
    featuredDate
    publishedDate
    scheduledDate
    viewCount
    reactionCounts
    thumbnail {
      name
      url
      type
      size
    }
    images {
      name
      url
      type
      size
    }
    videoUrl
    categoryIds
    categories {
      _id
      name
      slug
    }
    tagIds
    tags {
      _id
      name
      slug
      colorCode
    }
    customFieldsData
    createdAt
    updatedAt
  }
`;

export const CP_POST = gql`
  ${POST_FRAGMENT}
  query CpPost(
    $_id: String
    $slug: String
    $identifier: String
    $language: String
  ) {
    cpPost(
      _id: $_id
      slug: $slug
      identifier: $identifier
      language: $language
    ) {
      ...PostFields
    }
  }
`;

export type CpPostVariables = {
  _id?: string;
  slug?: string;
  identifier?: string;
  language?: string;
};

export type CpPostData = {
  cpPost: Post | null;
};

export const CP_POSTS = gql`
  ${POST_FRAGMENT}
  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      totalCount
      posts {
        _id
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        thumbnail {
          url
        }
        categories {
          _id
          name
        }
        images {
          url
          type
          name
        }
      }
    }
  }
`;

export type CpPostsVariables = {
  language?: string;
  webId?: string;
  featured?: boolean;
  type?: string;
  categoryIds?: string[];
  searchValue?: string;
  status?: PostStatus;
  tagIds?: string[];
  sortField?: string;
  sortDirection?: string;
  dateField?: PostDateField;
  dateFrom?: string;
  dateTo?: string;
  cursor?: string;
  limit?: number;
};

export type CpPostsData = {
  cpPosts: Post[];
};

export const CP_POST_LIST = gql`
  ${POST_FRAGMENT}
  query CpPostList(
    $language: String
    $webId: String
    $featured: Boolean
    $type: String
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
    $dateField: PostDateField
    $dateFrom: Date
    $dateTo: Date
    $cursor: String
    $limit: Int
  ) {
    cpPostList(
      language: $language
      webId: $webId
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
      dateField: $dateField
      dateFrom: $dateFrom
      dateTo: $dateTo
      cursor: $cursor
      limit: $limit
    ) {
      posts {
        ...PostFields
      }
      totalCount
     
    }
  }
`;

export type CpPostListVariables = CpPostsVariables;

export type CpPostListData = {
  cpPostList: PostList;
};

export const CP_MOST_VIEWED_POSTS = gql`
  ${POST_FRAGMENT}
  query CpMostViewedPosts(
    $days: Int!
    $limit: Int
    $language: String
    $webId: String
    $type: String
  ) {
    cpMostViewedPosts(
      days: $days
      limit: $limit
      language: $language
      webId: $webId
      type: $type
    ) {
      ...PostFields
    }
  }
`;

export type CpMostViewedPostsVariables = {
  days: number;
  limit?: number;
  language?: string;
  webId?: string;
  type?: string;
};

export type CpMostViewedPostsData = {
  cpMostViewedPosts: Post[];
};

// ============ tag ============
export type PostTagList = {
  tags: PostTag[];
  totalCount: number;
  pageInfo: PageInfo;
};

const TAG_FRAGMENT = gql`
  fragment TagFields on PostTag {
    _id
    clientPortalId
    name
    slug
    colorCode
    createdAt
    updatedAt
  }
`;

export const CP_CMS_TAGS = gql`
  ${TAG_FRAGMENT}
  query CpCmsTags(
    $language: String
    $searchValue: String
    $sortField: String
    $sortDirection: String
    $cursor: String
    $limit: Int
  ) {
    cpCmsTags(
      language: $language
      searchValue: $searchValue
      sortField: $sortField
      sortDirection: $sortDirection
      cursor: $cursor
      limit: $limit
    ) {
      tags {
        ...TagFields
      }
      totalCount
      pageInfo {
        cursor
        totalCount
      }
    }
  }
`;

export type CpCmsTagsVariables = {
  language?: string;
  searchValue?: string;
  sortField?: string;
  sortDirection?: string;
  cursor?: string;
  limit?: number;
};

export type CpCmsTagsData = {
  cpCmsTags: PostTagList;
};
