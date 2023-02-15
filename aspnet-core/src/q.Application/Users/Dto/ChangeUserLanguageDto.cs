using System.ComponentModel.DataAnnotations;

namespace q.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}