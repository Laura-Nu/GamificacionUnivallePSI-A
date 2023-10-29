using DB_Rank_API.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<BdrankingContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Server=DESKTOP-JQCSPOV\\SQLEXPRESS;Database=BDRanking;Trusted_Connection=True;"));
});

// Servicio para emitir una cookie de sesi�n y botar a gente sin autenticar
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "DbRankAuthCookie";
        options.LoginPath = "/api/auth/login"; // Ajusta esta ruta seg�n tu configuraci�n.
    });

builder.Services.AddAuthorization();

// Configuraci�n de CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
                .AllowCredentials();
    });
});

// Configura el l�mite de tama�o de archivos en bytes (por ejemplo, 10 MB)
builder.Services.Configure<FormOptions>(options =>
{
    options.ValueCountLimit = int.MaxValue;
    options.MultipartBodyLengthLimit = long.MaxValue;
    options.MultipartHeadersLengthLimit = int.MaxValue;
    options.MultipartBoundaryLengthLimit = int.MaxValue;
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

// Habilitar CORS
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
