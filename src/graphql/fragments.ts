import { gql } from '@apollo/client';

export const ProductVariantFields = gql`
  fragment ProductVariantFields on ProductVariant {
    id
    name
    price
    featuredAsset {
      name
      source
    }
  }
`;

export const ProductFields = gql`
  fragment ProductFields on Product {
    id
    name
    slug
    description
    featuredAsset {
      preview
    }
    variants {
      ...ProductVariantFields
    }
  }
`;

export const OrderLineFields = gql`
  fragment OrderLineFields on OrderLine {
    id
    quantity
    linePriceWithTax
    productVariant {
      ...ProductVariantFields
    }
  }
`;

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
  }
`;

export const ErrorResultFragment = gql`
  fragment ErrorResultFragment on ErrorResult {
    errorCode
    message
  }
`;
