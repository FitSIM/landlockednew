import { gql } from "@apollo/client";

// ============ booking ============
export type Deal = {
  _id: string;
  name?: string;
  stageId?: string;
  startDate?: string;
  closeDate?: string;
  description?: string;
  status?: string;
  productsData?: unknown;
  paymentsData?: unknown;
};

export const CP_DEALS = gql`
  query cpDeals(
    $pipelineId: String
    $customerIds: [String]
    $startDate: Date
    $endDate: Date
    $limit: Int
    $cursor: String
  ) {
    cpDeals(
      pipelineId: $pipelineId
      customerIds: $customerIds
      startDate: $startDate
      endDate: $endDate
      limit: $limit
      cursor: $cursor
    ) {
      _id
      name
      stageId
      startDate
      closeDate
      status
    }
  }
`;

export type CpDealsVariables = {
  pipelineId?: string;
  customerIds?: string[];
  startDate?: string;
  endDate?: string;
  limit?: number;
  cursor?: string;
};

export type CpDealsData = {
  cpDeals: Deal[];
};

export const CP_DEAL_DETAIL = gql`
  query cpDealDetail($_id: String!, $clientPortalCard: Boolean) {
    cpDealDetail(_id: $_id, clientPortalCard: $clientPortalCard) {
      _id
      name
      stageId
      startDate
      closeDate
      description
      status
      productsData
      paymentsData
    }
  }
`;

export type CpDealDetailVariables = {
  _id: string;
  clientPortalCard?: boolean;
};

export type CpDealDetailData = {
  cpDealDetail: Deal | null;
};

// ============ rooms ============
export type Room = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
};

export const CP_PMS_ROOMS = gql`
  query cpPmsRooms(
    $pipelineId: String!
    $startDate: Date
    $endDate: Date
    $skipStageIds: [String]
    $page: Int
    $perPage: Int
  ) {
    cpPmsRooms(
      pipelineId: $pipelineId
      startDate: $startDate
      endDate: $endDate
      skipStageIds: $skipStageIds
      page: $page
      perPage: $perPage
    ) {
      _id
      name
      description
      price
    }
  }
`;

export type CpPmsRoomsVariables = {
  pipelineId: string;
  startDate?: string;
  endDate?: string;
  skipStageIds?: string[];
  page?: number;
  perPage?: number;
};

export type CpPmsRoomsData = {
  cpPmsRooms: Room[];
};

export type RoomAvailability = {
  _id: string;
  available?: boolean;
};

export const CP_PMS_CHECK_ROOMS = gql`
  query cpPmsCheckRooms(
    $pipelineId: String!
    $startDate: Date
    $endDate: Date
    $ids: [String]
    $skipStageIds: [String]
  ) {
    cpPmsCheckRooms(
      pipelineId: $pipelineId
      startDate: $startDate
      endDate: $endDate
      ids: $ids
      skipStageIds: $skipStageIds
    ) {
      _id
      available
    }
  }
`;

export type CpPmsCheckRoomsVariables = {
  pipelineId: string;
  startDate?: string;
  endDate?: string;
  ids?: string[];
  skipStageIds?: string[];
};

export type CpPmsCheckRoomsData = {
  cpPmsCheckRooms: RoomAvailability[];
};
