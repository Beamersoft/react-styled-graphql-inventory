import { render } from '@testing-library/react';

import { Header } from './Header';
import { useOrder } from '../context/OrderContext';

jest.mock('../context/OrderContext', () => ({
  useOrder: jest.fn(),
}));

describe('Header', () => {
  test('renders Header with $0 subtotal when subtotal is undefined', () => {
    (useOrder as jest.Mock).mockImplementation(() => ({ subtotal: undefined }));
    const { queryByText } = render(<Header />);
    const subtotalElement = queryByText(/$0/i);
    expect(subtotalElement).toBeNull();
  });

  test('renders Header with the correct subtotal', () => {
    const testSubtotal = 123.45;
    (useOrder as jest.Mock).mockImplementation(() => ({ subtotal: testSubtotal }));
    const { getByText } = render(<Header />);
    const subtotalElement = getByText(`$ ${testSubtotal.toFixed(2)}`);
    expect(subtotalElement).toBeInTheDocument();
  });  
});