import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// This is the cart summary popup in the top right corner of the home page
function CartSummary() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.bookPrice, 0);

  // Logic and styling for the cart summary to display information dynamically, correctly, resize, etc.
  return (
    <div
      className="position-fixed top-0 end-0 m-3 bg-light p-3 rounded shadow border text-dark"
      style={{
        width: '20%',
        maxHeight: '350px',
        overflowY: 'auto',
        zIndex: 1050,
        fontSize: '14px',
        cursor: 'pointer',
      }}
      onClick={() => navigate('/cart')}
    >
      <h6 className="text-center fw-bold mb-2">🛒 Cart Summary</h6>
      <hr className="my-2" />
      {cart.length === 0 ? (
        <p className="text-muted text-center mb-2">Your cart is empty.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {cart.map((item) => (
            <li
              key={item.bookID}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="text-truncate" style={{ maxWidth: '180px' }}>
                <strong>{item.bookTitle}</strong>
                <br />
                <small className="text-muted">
                  Qty: {item.purchaseAmount} | ${item.bookPrice.toFixed(2)}
                </small>
              </div>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-2" />
      <div className="d-flex justify-content-between fw-bold">Total: ${totalAmount.toFixed(2)}</div>
    </div>
  );
}

export default CartSummary;
