function Cart({ cart, onCheckout }) {
  const total = cart.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="p-4 bg-base-200 rounded-box">
      <h2 className="text-xl font-bold">Cart</h2>
      {cart.map((item, i) => (
        <div key={i} className="flex justify-between">
          <span>{item.name}</span>
          <span>₹{item.price}</span>
        </div>
      ))}
      <hr className="my-2" />
      <p className="font-bold">Total: ₹{total}</p>
      <button className="btn btn-success mt-2" onClick={onCheckout}>Generate Bill</button>
    </div>
  );
}
export default Cart;
