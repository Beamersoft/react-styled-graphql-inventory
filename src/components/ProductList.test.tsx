import { 
  render,
  screen
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  useQuery,
  useMutation
} from '@apollo/client';

import { ProductList } from './ProductList';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(() => [jest.fn(), { data: {}, loading: false, error: null }]),
  useMutation: jest.fn(() => [jest.fn(), { data: {}, loading: false }]),
  gql: jest.fn().mockImplementation(() => ({})),
}));

describe('ProductList ', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  
  test('displays loading state', () => {
    useQuery.mockReturnValue({ loading: true, error: null, data: null });
    render(<ProductList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message', () => {
    useQuery.mockReturnValue({ loading: false, error: { message: 'An error occurred' }, data: null });
    render(<ProductList />);
    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });

  test('renders products when data is returned', () => {
    const productsMockedData = {
      products: {
        items: [
          { id: '1', name: 'Product 1', variants: [{ price: 100 }] },
          { id: '2', name: 'Product 2', variants: [{ price: 200 }] },
        ],
        totalItems: 2,
      },
    };
  
    useQuery.mockReturnValue({ loading: false, error: null, data: productsMockedData });
    useMutation.mockReturnValue([jest.fn(), { data: {}, loading: false, error: null }]);

    render(<ProductList />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });
  
})
