import { gql } from "@apollo/client";
import type { CustomPostType, MenuItem, Page, Post, PostCategory, PostReactionType, PostStatus, PostTag } from "./queries";

// ============ category ============
export type PostCategoryInput = {
  name?: string;
  slug?: string;
  description?: string;
  parentId?: string;
  status?: string;
  clientPortalId?: string;
  customFieldsData?: Record<string, unknown>;
  translations?: TranslationInput[];
};

export const CP_CMS_CATEGORIES_ADD = gql`
  mutation CpCmsCategoriesAdd($input: PostCategoryInput!) {
    cpCmsCategoriesAdd(input: $input) {
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
  }
`;

export type CpCmsCategoriesAddVariables = {
  input: PostCategoryInput;
};

export type CpCmsCategoriesAddData = {
  cpCmsCategoriesAdd: PostCategory;
};

// ============ customPostType ============
export type CustomPostTypeInput = {
  label: string;
  pluralLabel: string;
  code: string;
  description?: string;
  clientPortalId?: string;
};

export const CP_CMS_CUSTOM_POST_TYPES_ADD = gql`
  mutation CpCmsCustomPostTypesAdd($input: CustomPostTypeInput!) {
    cpCmsCustomPostTypesAdd(input: $input) {
      _id
      clientPortalId
      code
      label
      pluralLabel
      description
      createdAt
    }
  }
`;

export type CpCmsCustomPostTypesAddVariables = {
  input: CustomPostTypeInput;
};

export type CpCmsCustomPostTypesAddData = {
  cpCmsCustomPostTypesAdd: CustomPostType;
};

// ============ menu ============
export type MenuItemInput = {
  parentId?: string;
  clientPortalId?: string;
  webId?: string;
  label?: string;
  contentType?: string;
  contentTypeId?: string;
  kind?: string;
  icon?: string;
  url?: string;
  order?: number;
  target?: string;
  language?: string;
};

export const CP_CMS_ADD_MENU = gql`
  mutation CpCmsAddMenu($input: MenuItemInput!) {
    cpCmsAddMenu(input: $input) {
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
  }
`;

export type CpCmsAddMenuVariables = {
  input: MenuItemInput;
};

export type CpCmsAddMenuData = {
  cpCmsAddMenu: MenuItem;
};

// ============ page ============
export type PageItemInput = {
  name?: string;
  type?: string;
  content?: string;
  order?: number;
  objectType?: string;
  objectId?: string;
  config?: Record<string, unknown>;
};

export type PageInput = {
  clientPortalId?: string;
  language?: string;
  name?: string;
  parentId?: string;
  description?: string;
  coverImage?: string;
  status?: string;
  type?: string;
  slug?: string;
  content?: string;
  thumbnail?: AttachmentInput;
  pageImages?: AttachmentInput[];
  video?: AttachmentInput;
  audio?: AttachmentInput;
  documents?: AttachmentInput[];
  attachments?: AttachmentInput[];
  videoUrl?: string;
  pageItems?: PageItemInput[];
  customFieldsData?: Record<string, unknown>;
  translations?: TranslationInput[];
};

export const CP_CMS_PAGES_ADD = gql`
  mutation CpCmsPagesAdd($input: PageInput!) {
    cpCmsPagesAdd(input: $input) {
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
  }
`;

export type CpCmsPagesAddVariables = {
  input: PageInput;
};

export type CpCmsPagesAddData = {
  cpCmsPagesAdd: Page;
};

// ============ post ============
export type AttachmentInput = {
  name: string;
  url: string;
  type: string;
  size: number;
};

export type PdfAttachmentInput = {
  name: string;
  url: string;
  type: string;
  size: number;
};

export type TranslationInput = {
  objectId?: string;
  language: string;
  title?: string;
  content?: string;
  excerpt?: string;
  customFieldsData?: Record<string, unknown>;
  type?: string;
};

export type PostInput = {
  clientPortalId?: string;
  webId?: string;
  language?: string;
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  categoryIds?: string[];
  featured?: boolean;
  status?: PostStatus;
  tagIds?: string[];
  authorId?: string;
  scheduledDate?: string;
  publishedDate?: string;
  autoArchiveDate?: string;
  reactions?: PostReactionType[];
  reactionCounts?: Record<string, number>;
  thumbnail?: AttachmentInput;
  images?: AttachmentInput[];
  video?: AttachmentInput;
  audio?: AttachmentInput;
  documents?: AttachmentInput[];
  attachments?: AttachmentInput[];
  pdfAttachment?: PdfAttachmentInput;
  videoUrl?: string;
  customFieldsData?: Record<string, unknown>;
  type?: string;
  translations?: TranslationInput[];
};

export const CP_CMS_POSTS_ADD = gql`
  mutation CpCmsPostsAdd($input: PostInput!) {
    cpCmsPostsAdd(input: $input) {
      _id
      clientPortalId
      webId
      type
      title
      slug
      content
      excerpt
      status
      featured
      featuredDate
      publishedDate
      scheduledDate
      categoryIds
      tagIds
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
      customFieldsData
      createdAt
      updatedAt
    }
  }
`;

export type CpCmsPostsAddVariables = {
  input: PostInput;
};

export type CpCmsPostsAddData = {
  cpCmsPostsAdd: Post;
};

// ============ tag ============
export type PostTagInput = {
  name?: string;
  slug?: string;
  colorCode?: string;
  clientPortalId?: string;
  language?: string;
  translations?: TranslationInput[];
};

export const CP_CMS_TAGS_ADD = gql`
  mutation CpCmsTagsAdd($input: PostTagInput!) {
    cpCmsTagsAdd(input: $input) {
      _id
      clientPortalId
      name
      slug
      colorCode
      createdAt
      updatedAt
    }
  }
`;

export type CpCmsTagsAddVariables = {
  input: PostTagInput;
};

export type CpCmsTagsAddData = {
  cpCmsTagsAdd: PostTag;
};
