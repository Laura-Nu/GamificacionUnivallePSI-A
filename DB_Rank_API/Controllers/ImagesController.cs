using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DB_Rank_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        // GET: api/<ImagesController>
        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            // Construye la ruta completa de la imagen
            string imagePath = Path.Combine("C:\\Users\\launu\\OneDrive\\Escritorio\\Mockups\\Badges\\", imageName);

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
