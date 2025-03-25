import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import WelcomeCard from '../components/WelcomeCard';

// Defining the "cart" page where you'll be able to add books to your cart and continue shopping
// you can also Checkout (functionality to be added)
function PurchasePage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(1);

  const handleAddToCart = () => {
    // Calculating total price by multiplying price by amount (aka quantity)
    const totalPrice = Number(price) * purchaseAmount;

    const newItem: CartItem = {
      bookID: Number(bookID),
      bookTitle: title || 'No Book Found',
      purchaseAmount,
      bookPrice: totalPrice,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeCard />
      <h2>
        Buy <strong>{title}</strong>
      </h2>

      {price && (
        <div>
          <h3>Price: ${Number(price).toFixed(2)}</h3>
          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input
              id="quantity"
              type="number"
              placeholder="Enter quantity: "
              value={purchaseAmount}
              min="1"
              onChange={(x) => setPurchaseAmount(Number(x.target.value))}
              style={{ width: '40px' }}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      )}

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}

export default PurchasePage;
