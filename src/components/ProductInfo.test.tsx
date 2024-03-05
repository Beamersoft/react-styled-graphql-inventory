import { 
  render,
  fireEvent,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useMutation } from '@apollo/client';

import { ProductInfo } from './ProductInfo';
import { useOrder } from '../context/OrderContext';

jest.mock('@apollo/client', () => ({
  useMutation: jest.fn(() => [jest.fn(), { data: {}, loading: false, error: null }]),
  gql: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('../context/OrderContext', () => ({
  useOrder: jest.fn(),
}));

const productMock = {
  name: 'Test Product',
  description: 'Test Description',
  featuredAsset: {
    preview: 'test-image-url',
  },
  variants: [
    { name: 'Variant 1', price: 1000, id: 'v1' },
  ],
};


describe('ProductInfo', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('renders product information correctly', () => {    
    window.alert = () => {};
    useOrder.mockImplementation(() => ({ updateSubtotal: jest.fn() }));
    useMutation.mockImplementation(() => [jest.fn(), { loading: false }]);
  
    const { getByText, getByAltText } = render(<ProductInfo product={productMock} />);
    
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('Test Description')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByAltText('Test Product')).toHaveAttribute('src', 'test-image-url');
  });

  test('displays spinner when adding an item to order', async () => {
    useOrder.mockImplementation(() => ({ updateSubtotal: jest.fn() }));
    useMutation.mockImplementation(() => [jest.fn(), { loading: true }]);
  
    const { getByTestId } = render(<ProductInfo product={productMock} />);
    
    await waitFor(() => {
      expect(getByTestId('spinner')).toBeInTheDocument();
    });
  });

  test('calls addItemToOrder mutation when buy button is clicked', async () => {
    const mockAddItemToOrder = jest.fn();
  
    useOrder.mockImplementation(() => ({ updateSubtotal: jest.fn() }));
    useMutation.mockImplementation(() => [mockAddItemToOrder, { loading: false }]);
  
    const { getByText } = render(<ProductInfo product={productMock} />);
    
    fireEvent.click(getByText('Buy'));
    
    await waitFor(() => {
      expect(mockAddItemToOrder).toHaveBeenCalled();
    });
  });
});