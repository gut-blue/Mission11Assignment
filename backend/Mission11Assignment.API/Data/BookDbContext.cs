using Microsoft.EntityFrameworkCore;

namespace Mission11Assignment.API.Data;

// Setting up my DbContext file for the database
public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }
}