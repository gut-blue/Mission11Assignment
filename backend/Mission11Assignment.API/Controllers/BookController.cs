using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11Assignment.API.Data;

namespace Mission11Assignment.API.Controllers
{
    // My controller
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp ?? throw new ArgumentNullException(nameof(temp));
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(
            int pageSize = 5, 
            int pageNum = 1, 
            string sortOrder = "asc",
            [FromQuery] List<string>? bookCategories = null)
        {
            if (_bookContext.Books == null)
            {
                return StatusCode(500, "DB not initialized or Books table missing.");
            }

            try
            {
                // Default sorting by Title in ascending order
                var query = _bookContext.Books.AsQueryable();

                if (bookCategories != null && bookCategories.Any())
                {
                    query = query.Where(b =>
                        !string.IsNullOrEmpty(b.Category) && bookCategories.Contains(b.Category));
                }

                // Apply sorting based on the sortOrder parameter
                if (sortOrder.ToLower() == "desc")
                {
                    query = query.OrderByDescending(b => b.Title); // Sort by Title descending
                }
                else
                {
                    query = query.OrderBy(b => b.Title); // Sort by Title ascending
                }

                var totalNumBooks = query.Count();

                // Pagination
                var books = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var someObject = new
                {
                    Books = books,
                    TotalNumBooks = totalNumBooks
                };

                return Ok(someObject);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error in GetBooks: " + ex.Message);
                return StatusCode(500, "An error occured: " + ex.Message);
            }
        }
        
        // Adding another method so I can filter the books by category
        // in my filtering menu on the frontend
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }
        
        // Add Book route
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookID);
            
            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            
            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
        {
            var book = _bookContext.Books.Find(bookID);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
    }
}
