import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {/* Bootstrap thing #1: Toast component (pop-up) if cart is empty */}
      {cart.length === 0 && (
        <div
          className="toast show position-fixed top-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">Cart Notification</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">Your cart is empty. Add some books to get started!</div>
        </div>
      )}

      {/* If cart is not empty, show items in a Card layout */}
      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          <p>Your cart is empty. Add some books!</p>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-12 col-xl-12">
            {/* Bootstrap thing #2: Card component for cart items */}
            <div className="card shadow-sm">
              <div className="card-body">
                <ul className="list-group">
                  {cart.map((item: CartItem) => (
                    <li key={item.bookID} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-break">
                          <h5 className="mb-1">{item.bookTitle}</h5>
                          <p className="mb-1 text-muted">
                            <small>Qty: {item.purchaseAmount}</small>
                          </p>
                          <strong>${item.bookPrice.toFixed(2)}</strong>
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookID)}>
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* End Card */}
          </div>
        </div>
      )}

      <h3 className="text-end mb-4">
        Total: ${cart.reduce((total, item) => total + item.bookPrice, 0).toFixed(2)}
      </h3>
      <div className="d-flex justify-content-between">
        <button className="btn btn-success">Checkout</button>
        <button className="btn btn-outline-primary" onClick={() => navigate('/books')}>
          📚Continue Browsing
        </button>
      </div>
    </div>
  );
}

export default CartPage;
