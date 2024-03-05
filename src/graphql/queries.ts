import { gql } from '@apollo/client';
import {
  ProductVariantFields, 
  ProductFields, 
  OrderLineFields 
} from './fragments';

export const GET_PRODUCTS = gql`
  ${ProductVariantFields}
  ${ProductFields}

  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
      items {
        ...ProductFields
      }
      totalItems
    }
  }
`;

export const GET_ACTIVE_ORDER = gql`
  ${ProductVariantFields}
  ${OrderLineFields}

  query GetActiveOrder {
    activeOrder {
      id
      subTotal
      currencyCode
      totalQuantity
      lines {
        ...OrderLineFields
      }
    }
  }
`;
