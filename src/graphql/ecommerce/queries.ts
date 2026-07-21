import { gql } from "@apollo/client";

// ============ order ============
export type OrderItem = {
  _id: string;
  unitPrice?: number;
  orderId?: string;
  productName?: string;
  count?: number;
  productId?: string;
  isPackage?: boolean;
  isTake?: boolean;
  status?: string;
  productImgUrl?: string;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
};

export type Order = {
  _id: string;
  createdAt?: string;
  modifiedAt?: string;
  number?: string;
  status?: string;
  paidDate?: string;
  mobileAmount?: number;
  totalAmount?: number;
  slotCode?: string;
  registerNumber?: string;
  customerId?: string;
  printedEbarimt?: boolean;
  billType?: string;
  billId?: string;
  origin?: string;
  type?: string;
  deliveryInfo?: Record<string, unknown>;
  description?: string;
  items?: OrderItem[];
};

export type PutResponse = {
  totalAmount?: number;
  customerTin?: string;
  customerName?: string;
  id?: string;
  qrData?: string;
  lottery?: string;
};

const ORDER_ITEM_FIELDS = gql`
  fragment OrderItemFields on OrderItem {
    _id
    unitPrice
    orderId
    productName
    count
    productId
    isPackage
    isTake
    status
    productImgUrl
    discountAmount
    discountPercent
    bonusCount
  }
`;

export const CP_FULL_ORDERS = gql`
  ${ORDER_ITEM_FIELDS}
  query cpFullOrders(
    $customerId: String
    $saleStatus: String
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $statuses: [String]
  ) {
    cpFullOrders(
      customerId: $customerId
      saleStatus: $saleStatus
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      statuses: $statuses
    ) {
      _id
      deliveryInfo
      description
      billType
      registerNumber
      items {
        ...OrderItemFields
      }
    }
  }
`;

export type CpFullOrdersVariables = {
  customerId?: string;
  saleStatus?: string;
  perPage?: number;
  sortField?: string;
  sortDirection?: number;
  statuses?: string[];
};

export type CpFullOrdersData = {
  cpFullOrders: Order[];
};

export const ACTIVE_ORDER_DETAIL = gql`
  ${ORDER_ITEM_FIELDS}
  query ActiveOrderDetail($id: String, $customerId: String) {
    orderDetail(_id: $id, customerId: $customerId) {
      _id
      deliveryInfo
      description
      billType
      registerNumber
      items {
        ...OrderItemFields
      }
    }
  }
`;

export type ActiveOrderDetailVariables = {
  id?: string;
  customerId?: string;
};

export type ActiveOrderDetailData = {
  orderDetail: Order | null;
};

export const FULL_ORDERS = gql`
  query cpFullOrdersList(
    $customerId: String
    $statuses: [String]
    $perPage: Int
    $sortField: String
    $sortDirection: Int
    $saleStatus: String
  ) {
    cpFullOrders(
      customerId: $customerId
      statuses: $statuses
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
      saleStatus: $saleStatus
    ) {
      _id
      createdAt
      paidDate
      status
      totalAmount
      number
      items {
        productName
        productImgUrl
      }
    }
  }
`;

export type FullOrdersVariables = {
  customerId?: string;
  statuses?: string[];
  perPage?: number;
  sortField?: string;
  sortDirection?: number;
  saleStatus?: string;
};

export type FullOrdersData = {
  cpFullOrders: Order[];
};

export const ORDERS_CHECK_COMPANY = gql`
  query ordersCheckCompany($registerNumber: String!) {
    ordersCheckCompany(registerNumber: $registerNumber)
  }
`;

export type OrdersCheckCompanyVariables = {
  registerNumber: string;
};

export type OrdersCheckCompanyData = {
  ordersCheckCompany: Record<string, unknown>;
};

export const CP_ORDER_DETAIL = gql`
  ${ORDER_ITEM_FIELDS}
  query cpOrderDetail($id: String!, $customerId: String!) {
    cpOrderDetail(_id: $id, customerId: $customerId) {
      _id
      createdAt
      modifiedAt
      number
      status
      paidDate
      mobileAmount
      totalAmount
      slotCode
      registerNumber
      customerId
      printedEbarimt
      billType
      billId
      origin
      type
      deliveryInfo
      description
      items {
        ...OrderItemFields
      }
      customer {
        firstName
        lastName
        primaryEmail
        primaryPhone
        code
      }
      user {
        _id
        primaryPhone
        firstName
        primaryEmail
        lastName
      }
      putResponses {
        totalAmount
        customerTin
        customerName
        id
        qrData
        lottery
      }
    }
  }
`;

export type CpOrderDetailVariables = {
  id: string;
  customerId: string;
};

export type CpOrderDetailData = {
  cpOrderDetail: Order & {
    customer?: {
      firstName?: string;
      lastName?: string;
      primaryEmail?: string;
      primaryPhone?: string;
      code?: string;
    };
    user?: {
      _id?: string;
      primaryPhone?: string;
      firstName?: string;
      primaryEmail?: string;
      lastName?: string;
    };
    putResponses?: PutResponse[];
  };
};

export const ORDER_ITEM_DETAIL = gql`
  query OrderItemDetail($id: String) {
    poscProductDetail(_id: $id) {
      remainder
      category {
        name
      }
    }
  }
`;

export type OrderItemDetailVariables = {
  id?: string;
};

export type OrderItemDetailData = {
  poscProductDetail: {
    remainder?: number;
    category?: { name?: string };
  } | null;
};

export const ORDER_INVOICES = gql`
  query Invoices($contentType: String, $contentTypeId: String) {
    invoices(contentType: $contentType, contentTypeId: $contentTypeId) {
      _id
      amount
      status
    }
  }
`;

export type OrderInvoicesVariables = {
  contentType?: string;
  contentTypeId?: string;
};

export type OrderInvoicesData = {
  invoices: Array<{ _id: string; amount?: number; status?: string }>;
};

export const ORDER_ADDRESSES = gql`
  query Addresses {
    clientPortalCurrentUser {
      customer {
        addresses
      }
    }
  }
`;

export type OrderAddressesData = {
  clientPortalCurrentUser: {
    customer?: { addresses?: Record<string, unknown>[] };
  } | null;
};

export const ORDERS_ORDERED = gql`
  subscription ordersOrdered(
    $statuses: [String]
    $customerId: String
    $token: String
  ) {
    ordersOrdered(
      statuses: $statuses
      customerId: $customerId
      posToken: $token
    ) {
      _id
    }
  }
`;

export type OrdersOrderedVariables = {
  statuses?: string[];
  customerId?: string;
  token?: string;
};

export type OrdersOrderedData = {
  ordersOrdered: { _id: string };
};

// ============ payment ============
export type Payment = {
  _id: string;
  name?: string;
  kind?: string;
  status?: string;
  config?: Record<string, unknown>;
  createdAt?: string;
};

export type Invoice = {
  _id: string;
  invoiceNumber?: string;
  amount?: number;
  remainingAmount?: number;
  phone?: string;
  email?: string;
  description?: string;
  status?: string;
  data?: Record<string, unknown>;
  contentTypeId?: string;
  transactions?: PaymentTransaction[];
};

export type PaymentTransaction = {
  _id: string;
  paymentId?: string;
  paymentKind?: string;
  status?: string;
  details?: Record<string, unknown>;
  response?: Record<string, unknown>;
};

export const CP_PAYMENTS = gql`
  query cpPayments {
    cpPayments {
      _id
      name
      kind
      status
      config
      createdAt
    }
  }
`;

export type CpPaymentsData = {
  cpPayments: Payment[];
};

export const INVOICE_UPDATED = gql`
  subscription invoiceUpdated($invoiceId: String!) {
    invoiceUpdated(_id: $invoiceId)
  }
`;

export type InvoiceUpdatedVariables = {
  invoiceId: string;
};

export type InvoiceUpdatedData = {
  invoiceUpdated: boolean;
};

export const TRANSACTION_UPDATED = gql`
  subscription transactionUpdated($invoiceId: String!) {
    transactionUpdated(invoiceId: $invoiceId)
  }
`;

export type TransactionUpdatedVariables = {
  invoiceId: string;
};

export type TransactionUpdatedData = {
  transactionUpdated: boolean;
};

// ============ product ============
export type Attachment = {
  url: string;
};

export type ProductCategory = {
  _id: string;
  name?: string;
  code?: string;
  order?: string;
  parentId?: string;
  attachment?: Attachment;
};

export type Product = {
  _id: string;
  name?: string;
  code?: string;
  description?: string;
  type?: string;
  createdAt?: string;
  unitPrice?: number;
  remainder?: number;
  hasSimilarity?: boolean;
  attachment?: Attachment;
  attachmentMore?: Attachment[];
  customFieldsData?: Record<string, unknown>;
  category?: Pick<ProductCategory, "_id" | "name" | "order">;
};

export type ProductSimilarityGroup = {
  fieldId?: string;
  title?: string;
};

export const POSC_PRODUCT_CATEGORIES = gql`
  query poscProductCategories(
    $parentId: String
    $searchValue: String
    $excludeEmpty: Boolean
    $meta: String
    $page: Int
    $perPage: Int
    $sortField: String
    $sortDirection: Int
  ) {
    poscProductCategories(
      parentId: $parentId
      searchValue: $searchValue
      excludeEmpty: $excludeEmpty
      meta: $meta
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      name
      code
      order
      parentId
      attachment {
        url
      }
    }
  }
`;

export type PoscProductCategoriesVariables = {
  parentId?: string;
  searchValue?: string;
  excludeEmpty?: boolean;
  meta?: string;
  page?: number;
  perPage?: number;
  sortField?: string;
  sortDirection?: number;
};

export type PoscProductCategoriesData = {
  poscProductCategories: ProductCategory[];
};

export const POSC_PRODUCTS = gql`
  query poscProducts(
    $searchValue: String
    $type: String
    $categoryId: String
    $page: Int
    $perPage: Int
    $isKiosk: Boolean
    $groupedSimilarity: String
    $sortField: String
    $sortDirection: Int
  ) {
    poscProducts(
      searchValue: $searchValue
      categoryId: $categoryId
      type: $type
      page: $page
      perPage: $perPage
      isKiosk: $isKiosk
      groupedSimilarity: $groupedSimilarity
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      _id
      name
      code
      unitPrice
      hasSimilarity
      attachment {
        url
      }
    }
  }
`;

export type PoscProductsVariables = {
  searchValue?: string;
  type?: string;
  categoryId?: string;
  page?: number;
  perPage?: number;
  isKiosk?: boolean;
  groupedSimilarity?: string;
  sortField?: string;
  sortDirection?: number;
};

export type PoscProductsData = {
  poscProducts: Product[];
};

export const POSC_PRODUCTS_META = gql`
  query poscProductsMeta($perPage: Int) {
    poscProducts(perPage: $perPage, isKiosk: true) {
      _id
      modifiedAt
    }
  }
`;

export type PoscProductsMetaVariables = {
  perPage?: number;
};

export type PoscProductsMetaData = {
  poscProducts: Array<{ _id: string; modifiedAt?: string }>;
};

export const POSC_PRODUCT_SIMILARITIES = gql`
  query PoscProductSimilarities($id: String!, $groupedSimilarity: String) {
    poscProductSimilarities(_id: $id, groupedSimilarity: $groupedSimilarity) {
      products {
        _id
        name
        description
        code
        type
        createdAt
        unitPrice
        remainder
        category {
          order
          name
          _id
        }
        attachment {
          url
        }
        attachmentMore {
          url
        }
        customFieldsData
      }
      groups {
        fieldId
        title
      }
    }
  }
`;

export type PoscProductSimilaritiesVariables = {
  id: string;
  groupedSimilarity?: string;
};

export type PoscProductSimilaritiesData = {
  poscProductSimilarities: {
    products: Product[];
    groups: ProductSimilarityGroup[];
  };
};

export const POSC_PRODUCTS_COUNT = gql`
  query productsCount(
    $categoryId: String
    $type: String
    $searchValue: String
    $groupedSimilarity: String
    $isKiosk: Boolean
  ) {
    poscProductsTotalCount(
      categoryId: $categoryId
      type: $type
      searchValue: $searchValue
      groupedSimilarity: $groupedSimilarity
      isKiosk: $isKiosk
    )
  }
`;

export type PoscProductsCountVariables = {
  categoryId?: string;
  type?: string;
  searchValue?: string;
  groupedSimilarity?: string;
  isKiosk?: boolean;
};

export type PoscProductsCountData = {
  poscProductsTotalCount: number;
};

export const POSC_PRODUCT_DETAIL = gql`
  query ProductDetail($_id: String) {
    poscProductDetail(_id: $_id) {
      _id
      name
      description
      code
      type
      createdAt
      unitPrice
      remainder
      hasSimilarity
      category {
        order
        name
        _id
      }
      attachment {
        url
      }
      attachmentMore {
        url
      }
    }
  }
`;

export type PoscProductDetailVariables = {
  _id?: string;
};

export type PoscProductDetailData = {
  poscProductDetail: Product | null;
};

// ============ productReview ============
export type ProductReview = {
  _id: string;
  productId?: string;
  customerId?: string;
  review?: number;
  description?: string;
  info?: Record<string, unknown>;
};

export const CP_PRODUCT_REVIEWS = gql`
  query cpProductReviews(
    $productIds: [String]
    $customerId: String
    $page: Int
    $perPage: Int
  ) {
    cpProductReviews(
      productIds: $productIds
      customerId: $customerId
      page: $page
      perPage: $perPage
    ) {
      _id
      productId
      customerId
      review
      description
      info
    }
  }
`;

export type CpProductReviewsVariables = {
  productIds?: string[];
  customerId?: string;
  page?: number;
  perPage?: number;
};

export type CpProductReviewsData = {
  cpProductReviews: ProductReview[];
};

// ============ wishlist ============
export type Wishlist = {
  _id: string;
  productId?: string;
  customerId?: string;
  product?: {
    _id: string;
    name?: string;
    code?: string;
    unitPrice?: number;
    attachment?: { url?: string };
  };
};

export const CP_WISH = gql`
  query cpWish($productIds: [String], $customerId: String) {
    cpWish(productIds: $productIds, customerId: $customerId) {
      _id
      productId
      customerId
    }
  }
`;

export type CpWishVariables = {
  productIds?: string[];
  customerId?: string;
};

export type CpWishData = {
  cpWish: Wishlist[];
};

export const CP_WISHLIST = gql`
  query cpWishlist($customerId: String!) {
    cpWishlist(customerId: $customerId) {
      _id
      productId
      customerId
      product {
        _id
        name
        code
        unitPrice
        attachment {
          url
        }
      }
    }
  }
`;

export type CpWishlistVariables = {
  customerId?: string;
};

export type CpWishlistData = {
  cpWishlist: Wishlist[];
};
