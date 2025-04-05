namespace Mission11Assignment.API.Data;

// For helping grab the whole list of books from the database
public class BookListData
{
    public List<Book>? Books { get; set; }
    public int TotalNumBooks { get; set; }
}