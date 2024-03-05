import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_ITEM_TO_ORDER } from '../graphql/mutations';
import { useOrder } from '../context/OrderContext';
import { 
  ProdInfo, 
  ProductCard, 
  ProductDescription, 
  ProductImage, 
  ProductName, 
  ProductPrice, 
  StyledButton,
  StyledSelect,
  Spinner
} from './ProductInfoStyles';

export const ProductInfo = ({ product }: any) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [addItemToOrder, { loading }] = useMutation(ADD_ITEM_TO_ORDER);
  const { updateSubtotal }: any = useOrder();

  const handleVariantChange = (event: any) => {
    const selectedVariant = product.variants.find((variant: any) => variant.name === event.target.value);
    setSelectedVariant(selectedVariant);
  };

  const handleBuy = async () => {
    try {
      await addItemToOrder({
        variables: {
          productVariantId: selectedVariant.id,
          quantity: 1,
        },
      });
      updateSubtotal(selectedVariant.price / 100);
      alert('Product added to order successfully!');
    } catch (error) {
      console.error('Error adding item to order:', error);
      alert('Failed to add product to order.');
    }
  };

  if (!product) return null;
    
  return (
    <ProductCard>
      {product.featuredAsset && (
        <ProductImage src={product.featuredAsset.preview} alt={product.name} />
      )}
      <ProdInfo>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <StyledSelect onChange={handleVariantChange} value={selectedVariant.name}>
          {product.variants.map((variant: any) => (
            <option key={variant.id + variant.name} value={variant.name}>
              {variant.name}
            </option>
          ))}
        </StyledSelect>
        <ProductPrice>${selectedVariant.price / 100}</ProductPrice>
        {loading ? (
          <Spinner data-testid="spinner" />
        ) : (
          <StyledButton onClick={handleBuy}>Buy</StyledButton>
        )}
      </ProdInfo>
    </ProductCard>
  );
};
