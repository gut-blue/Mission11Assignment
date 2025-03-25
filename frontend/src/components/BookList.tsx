import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

// State variables for books, pagination, and sorting
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();

  // Fetch books whenever pageSize, pageNum, totalItems, or sortOrder changes
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories // Sorting logic
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]); // Re-fetch books if any of these state variables change

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
      {[...Array(totalPages)].map((_, index) => (
        <button disabled={pageNum === index + 1} key={index + 1} onClick={() => setPageNum(index + 1)}>
          {index + 1}
        </button>
      ))}

      <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
        Next
      </button>

      <br />
      {/* Dropdown to select number of results per page */}
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(b) => {
            setPageSize(Number(b.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
