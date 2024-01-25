import { useCart } from './useCart';

export function ThankYouForYourOrder() {
  return (
    <>
      <h1 className="font-bold">Thank you for your order</h1>
      <p>Your preparation items:</p>
      <div className="grid grid-rows-1 grid-flow-col gap-10 m-auto">
        <MappedItem />
      </div>
    </>
  );
}

export function MappedItem() {
  const { cartItems } = useCart();

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.foodId}>
          <img src={item.imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
}
