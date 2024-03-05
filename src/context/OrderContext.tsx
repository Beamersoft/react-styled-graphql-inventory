import { 
  createContext,
  useContext,
  useEffect, 
  useMemo
} from 'react';

import { GET_ACTIVE_ORDER } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import useStateWithStorage from '../hooks/useStateWithStorage';

const OrderContext = createContext({});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }: any) => {
  const [subtotal, setSubtotal] = useStateWithStorage<number>('orderSubtotal', 0);
  const { data } = useQuery(GET_ACTIVE_ORDER);

  useEffect(() => {
    if (data?.activeOrder) {
      setSubtotal(data.activeOrder.subTotal / 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateSubtotal = (amount: number) => {
    setSubtotal((prevSubtotal) => Number(prevSubtotal) + amount);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoContextValue = useMemo(() => ({ subtotal, updateSubtotal }), [subtotal]);

  return (
    <OrderContext.Provider value={memoContextValue}>
      {children}
    </OrderContext.Provider>
  );
};
