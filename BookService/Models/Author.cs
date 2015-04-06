using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace BookService.Models
{
    public class Author
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}