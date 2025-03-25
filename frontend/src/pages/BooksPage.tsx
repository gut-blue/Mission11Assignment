import { useState } from 'react';
import BookList from '../components/BookList';
import CartSummary from '../components/CartSummary';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeCard from '../components/WelcomeCard';

// Creating basically a "page" containing many components (this will be referenced in the App.tsx)
// it makes things easier for navigation.
function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* First Row: Cart Summary and Welcome Card */}
      <div className="row">
        <div className="col-12 col-md-3">
          <CartSummary />
        </div>
        <div className="col-12 col-md-9">
          <WelcomeCard />
        </div>
      </div>

      {/* Second Row: Category Filter and Book List */}
      <div className="row mt-4">
        <div className="col-12 col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-12 col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
