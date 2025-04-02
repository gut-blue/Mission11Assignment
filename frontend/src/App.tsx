import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import PurchasePage from './pages/PurchasePage';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminBooksPage from './pages/AdminBooksPage';

// Primarily being used for navigation now and displaying all my related pages that often
// contain many components
function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/purchase/:title/:bookID/:price" element={<PurchasePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
