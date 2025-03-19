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
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc")
        {
            // Default sorting by Title in ascending order
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting based on the sortOrder parameter
            if (sortOrder.ToLower() == "desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);  // Sort by Title descending
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);  // Sort by Title ascending
            }

            // Pagination
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            
            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };
            
            return Ok(someObject);
        }
    }
}
