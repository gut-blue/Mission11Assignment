import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

// State variables for books, pagination, and sorting
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch books whenever pageSize, pageNum, totalItems, or sortOrder changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories, sortOrder);

        setBooks(data.books);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(totalItems / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]); // Re-fetch books if any of these state variables change

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // Returning my list of book details
  return (
    <>
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Title: </strong>
                {b.title}
              </li>
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Number of pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: $</strong>
                {b.price}
              </li>
            </ul>

            {/* Button for user to add new book to cart */}
            <button
              className="btn btn-success"
              onClick={() => navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)}
            >
              <strong>Add Book to Cart</strong>
            </button>
          </div>
        </div>
      ))}

      {/* Sort buttons */}
      <button onClick={() => setSortOrder('asc')}>Sort Ascending</button>
      <button onClick={() => setSortOrder('desc')}>Sort Descending</button>

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {/* Dynamically generate page number buttons */}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
