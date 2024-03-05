import { gql } from '@apollo/client';
import { 
  ErrorResultFragment, 
  OrderFragment 
} from './fragments';

export const ADD_ITEM_TO_ORDER = gql`
  ${OrderFragment}
  ${ErrorResultFragment}
  
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ...OrderFragment
      ...ErrorResultFragment
    }
  }
`;
