using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DB_Rank_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
{
    [HttpGet("{imageName}")]
    public IActionResult GetImage(string imageName)
    {
        // Directorio base donde se encuentran las imágenes
        string baseDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Images");

        // Construye la ruta completa de la imagen
        string imagePath = Path.Combine(baseDirectory, imageName);

        // Verifica si el archivo existe
        if (!System.IO.File.Exists(imagePath))
        {
            return NotFound();
        }

        // Devuelve el archivo de imagen
        var imageStream = System.IO.File.OpenRead(imagePath);
        return File(imageStream, "image/jpeg"); // Ajusta el tipo de contenido según el formato de tus imágenes
    }
}

}
