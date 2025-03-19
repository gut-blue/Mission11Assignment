using System.ComponentModel.DataAnnotations;

namespace Mission11Assignment.API.Data;

// Making the model for the table in my DB
public class Book
{
    [Key]
    public int BookID { get; set; }
    
    public string Title { get; set; }
    public string Author { get; set; }
    public string Publisher { get; set; }
    public string ISBN { get; set; }
    public string Classification { get; set; }
    public string Category { get; set; }
    public int PageCount { get; set; }
    public float Price { get; set; }
}