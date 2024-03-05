import { useOrder } from '../context/OrderContext';
import {
  StyledHeader,
  Subtotal
} from './HeaderStyles';

export function Header() {
  const { subtotal }: any = useOrder();

  return (
    <StyledHeader>
      <Subtotal>$ {subtotal ? subtotal.toFixed(2) : 0}</Subtotal>
    </StyledHeader>
  );
}
