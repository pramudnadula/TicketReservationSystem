using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TicketReservationSystem.Auth;
using TicketReservationSystem.Model;
using TicketReservationSystem.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection(nameof(DatabaseSettings)));
builder.Services.AddSingleton<IDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("DatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IAuthHashService, AuthHashService>();

// user 
builder.Services.AddScoped<IUserService, UserService>();

//train
builder.Services.AddScoped<IScheduleService, ScheduleService>();


//booking
builder.Services.AddScoped<IBookingService, BookingService>();

// Enable CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowSpecificOrigin",
//         builder =>
//         {
//             builder.WithOrigins("http://localhost:3000", "http://192.168.56.1:3000")
//                 .AllowAnyHeader()
//                 .AllowAnyMethod();
//         });
// });

// Enable CORS for all origins, headers and methods.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "YourIssuer", // Replace with your issuer
        ValidAudience = "YourAudience", // Replace with your audience
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("24sxdf5g6h7j8k9l0;./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl,./';p0o9i8u7y6t5r4e3w2q1azsxdcfvgbhnjmkl"))
    };
});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromHours(2);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS for specific origins, headers and methods.
// app.UseCors("AllowSpecificOrigin"); // Place this line early in the pipeline

// Enable CORS for all origins, headers and methods.
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthentication(); // Add this line
app.UseAuthorization();
app.UseSession();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
