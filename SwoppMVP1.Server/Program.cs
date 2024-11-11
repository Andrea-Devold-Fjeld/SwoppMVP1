
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MySql.Data.MySqlClient;
using SwoppMVP1.Server.DAL;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "JWT Authentication",
        Description = "Enter JWT Bearer token",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
    };

    options.AddSecurityDefinition("Bearer", securityScheme);

    var securityRequirement = new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    };
    
    options.AddSecurityRequirement(securityRequirement);
});

builder.Services.AddAuthorization(
    options =>
    {
        options.AddPolicy("TransporterOnly", policy => policy.RequireClaim("Transporter", true.ToString()));
    });

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
/*
 * options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
 */
/*
builder.Services.AddAuthorization(options =>
    options.AddPolicy("TransporterOnly", policy => RequireClaim("TransporterId"
        )
    ));
    */
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
var connectionString = new MySqlConnectionStringBuilder()
{
    Server = Environment.GetEnvironmentVariable("INSTANCE_UNIX_SOCKET"),
    Port = Convert.ToUInt32(Environment.GetEnvironmentVariable("PORT")),
    UserID = Environment.GetEnvironmentVariable("DB_USER"),
    Password = Environment.GetEnvironmentVariable("DB_PASS"),
    Database = Environment.GetEnvironmentVariable("DB_NAME"),
};
Console.WriteLine(builder.Configuration["ConnectionStrings:AppDbContextConnection"]);
builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseMySQL(//"Server=<INSTANCE_UNIX_SOCKET>;Uid=<DB_USER>;Pwd=<DB_PASS>;Database=<DB_NAME>;Protocol=unix"
        builder.Configuration["ConnectionStrings:AppDbContextConnection"]));
    
/*
    options.UseSqlite(
        builder.Configuration["ConnectionStrings:AppDbContextConnection"]));
        */
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddScoped<IPacketRepository, PacketRepository>();
builder.Services.AddScoped<IDeliveryRepository, DeliveryRepository>();
builder.Services.AddTransient<IClaimsTransformation, MyClaimsTransformation>();




var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.MapSwagger().RequireAuthorization();

app.MapControllers();
app.MapGroup("/account").MapIdentityApi<IdentityUser>();

app.MapFallbackToFile("/index.html");

app.Run();
