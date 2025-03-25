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
        
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }
    }
}
