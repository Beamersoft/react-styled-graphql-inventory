import { useState } from 'react';

import { useQuery } from '@apollo/client';

import { GET_PRODUCTS } from '../graphql/queries';
import { ProductInfo } from './ProductInfo';
import { 
  Grid, 
  PageButton, 
  PageInfo, 
  PaginationContainer 
} from './ProductListStyles';

const ITEMS_PER_PAGE = 10;

export function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
  });

  const totalPages = data ? Math.ceil(data.products.totalItems / ITEMS_PER_PAGE) : 0;

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{"Error: " + error.message}</p>;

  return (
    <>
      <Grid>
        {data?.products.items.map((product: any) => (
          <ProductInfo key={product.id} product={product} />
        ))}
      </Grid>
      <PaginationContainer>
        <PageButton onClick={goToPreviousPage} disabled={currentPage <= 1}>Previous</PageButton>
        <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
        <PageButton onClick={goToNextPage} disabled={currentPage >= totalPages}>Next</PageButton>
      </PaginationContainer>
    </>
  );
}
