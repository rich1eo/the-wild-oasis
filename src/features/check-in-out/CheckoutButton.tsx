import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

interface CheckoutButtonProps {
  bookingId: number;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout(bookingId);

  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout()}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
