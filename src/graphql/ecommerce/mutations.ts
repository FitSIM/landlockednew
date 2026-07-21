import { gql } from "@apollo/client";
import type { Invoice, Order, PaymentTransaction, ProductReview } from "./queries";

// ============ order ============
export type OrderItemInput = {
  productId?: string;
  count?: number;
  unitPrice?: number;
  isPackage?: boolean;
  isTake?: boolean;
  status?: string;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
};

export type OrderAddEditVariables = {
  items?: OrderItemInput[];
  totalAmount: number;
  type: string;
  customerId?: string;
  customerType?: string;
  registerNumber?: string;
  billType?: string;
  origin?: string;
  dueDate?: string;
  branchId?: string;
  deliveryInfo?: Record<string, unknown>;
  description?: string;
  saleStatus?: string;
};

const addEditParamDefs = `$items: [OrderItemInput], $totalAmount: Float!, $type: String!, $customerId: String, $customerType: String, $registerNumber: String, $billType: String, $origin: String, $dueDate: Date, $branchId: String, $deliveryInfo: JSON, $description: String, $saleStatus: String`;
const addEditParams = `items: $items, totalAmount: $totalAmount, type: $type, customerId: $customerId, customerType: $customerType, registerNumber: $registerNumber, billType: $billType, origin: $origin, dueDate: $dueDate, branchId: $branchId, deliveryInfo: $deliveryInfo, description: $description, saleStatus: $saleStatus`;

export const CP_ORDERS_ADD = gql`
  mutation cpOrdersAdd(${addEditParamDefs}) {
    cpOrdersAdd(${addEditParams}) {
      _id
      status
      totalAmount
      number
      deliveryInfo
      items {
        _id
        productId
        productName
        productImgUrl
        count
        unitPrice
      }
    }
  }
`;

export type CpOrdersAddVariables = OrderAddEditVariables;

export type CpOrdersAddData = {
  cpOrdersAdd: Pick<Order, "_id">;
};

export const CP_ORDERS_EDIT = gql`
  mutation cpOrdersEdit($_id: String!, ${addEditParamDefs}) {
    cpOrdersEdit(_id: $_id, ${addEditParams}) {
      _id
      status
    }
  }
`;

export type CpOrdersEditVariables = OrderAddEditVariables & { _id: string };

export type CpOrdersEditData = {
  cpOrdersEdit: Pick<Order, "_id" | "status">;
};

export const CP_ORDERS_CANCEL = gql`
  mutation cpOrdersCancel($_id: String!) {
    cpOrdersCancel(_id: $_id)
  }
`;

export type CpOrdersCancelVariables = {
  _id: string;
};

export type CpOrdersCancelData = {
  cpOrdersCancel: boolean;
};

export const CP_ORDER_CHANGE_SALE_STATUS = gql`
  mutation cpOrderChangeSaleStatus($_id: String!, $saleStatus: String) {
    cpOrderChangeSaleStatus(_id: $_id, saleStatus: $saleStatus) {
      _id
    }
  }
`;

export type CpOrderChangeSaleStatusVariables = {
  _id: string;
  saleStatus?: string;
};

export type CpOrderChangeSaleStatusData = {
  cpOrderChangeSaleStatus: Pick<Order, "_id">;
};

// ============ payment ============
export type InvoiceInput = {
  amount: number;
  phone?: string;
  email?: string;
  description?: string;
  contentType?: string;
  contentTypeId?: string;
  customerId?: string;
  customerType?: string;
  paymentIds?: string[];
  data?: Record<string, unknown>;
};

export type PaymentTransactionInput = {
  invoiceId: string;
  paymentId: string;
  paymentKind?: string;
  amount?: number;
  details?: Record<string, unknown>;
};

export const INVOICE_CREATE = gql`
  mutation InvoiceCreate($input: InvoiceInput!) {
    invoiceCreate(input: $input) {
      _id
      invoiceNumber
      amount
      remainingAmount
      phone
      email
      description
      status
      data
      contentTypeId
      transactions {
        _id
        paymentId
        paymentKind
        status
        details
        response
      }
    }
  }
`;

export type InvoiceCreateVariables = {
  input: InvoiceInput;
};

export type InvoiceCreateData = {
  invoiceCreate: Invoice;
};

export const INVOICES_CHECK = gql`
  mutation InvoicesCheck($id: String!) {
    invoicesCheck(_id: $id)
  }
`;

export type InvoicesCheckVariables = {
  id: string;
};

export type InvoicesCheckData = {
  invoicesCheck: boolean;
};

export const PAYMENT_TRANSACTIONS_ADD = gql`
  mutation PaymentTransactionsAdd($input: PaymentTransactionInput!) {
    paymentTransactionsAdd(input: $input) {
      _id
      amount
      invoiceId
      paymentId
      paymentKind
      status
      response
      details
    }
  }
`;

export type PaymentTransactionsAddVariables = {
  input: PaymentTransactionInput;
};

export type PaymentTransactionsAddData = {
  paymentTransactionsAdd: PaymentTransaction & {
    amount?: number;
    invoiceId?: string;
  };
};

// ============ productReview ============
export type ProductReviewInput = {
  productId?: string;
  customerId?: string;
  review?: number;
  description?: string;
  info?: Record<string, unknown>;
};

export const CP_PRODUCT_REVIEW_ADD = gql`
  mutation cpProductReviewAdd(
    $productId: String
    $customerId: String
    $review: Float
    $description: String
    $info: JSON
  ) {
    cpProductReviewAdd(
      productId: $productId
      customerId: $customerId
      review: $review
      description: $description
      info: $info
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

export type CpProductReviewAddVariables = ProductReviewInput;

export type CpProductReviewAddData = {
  cpProductReviewAdd: ProductReview;
};

export const PRODUCT_REVIEW_UPDATE = gql`
  mutation cpProductReviewUpdate(
    $_id: String!
    $productId: String
    $customerId: String
    $review: Float
    $description: String
    $info: JSON
  ) {
    cpProductReviewUpdate(
      _id: $_id
      productId: $productId
      customerId: $customerId
      review: $review
      description: $description
      info: $info
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

export type ProductReviewUpdateVariables = { _id: string } & ProductReviewInput;

export type ProductReviewUpdateData = {
  productreviewUpdate: ProductReview;
};

export const PRODUCT_REVIEW_REMOVE = gql`
  mutation cpProductReviewRemove($_id: String!) {
    cpProductReviewRemove(_id: $_id) {
      _id
    }
  }
`;

export type ProductReviewRemoveVariables = {
  _id: string;
};

export type ProductReviewRemoveData = {
  cpProductReviewRemove: { _id: string };
};

// ============ wishlist ============
export const CP_WISHLIST_ADD = gql`
  mutation cpWishlistAdd($productId: String!, $customerId: String!) {
    cpWishlistAdd(productId: $productId, customerId: $customerId) {
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

export type CpWishlistAddVariables = {
  productId?: string;
  customerId?: string;
};

export type CpWishlistAddData = {
  cpWishlistAdd: { _id: string };
};

export const CP_WISHLIST_UPDATE = gql`
  mutation cpWishlistUpdate(
    $_id: String!
    $productId: String
    $customerId: String
  ) {
    cpWishlistUpdate(
      _id: $_id
      productId: $productId
      customerId: $customerId
    ) {
      _id
      productId
      customerId
    }
  }
`;

export type CpWishlistUpdateVariables = {
  _id: string;
  productId?: string;
  customerId?: string;
};

export type CpWishlistUpdateData = {
  cpWishlistUpdate: { _id: string };
};

export const CP_WISHLIST_REMOVE = gql`
  mutation cpWishlistRemove($_id: String!) {
    cpWishlistRemove(_id: $_id) {
      _id
      productId
    }
  }
`;

export type CpWishlistRemoveVariables = {
  _id: string;
};

export type CpWishlistRemoveData = {
  cpWishlistRemove: { _id: string };
};
