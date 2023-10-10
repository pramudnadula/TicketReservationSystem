using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TicketReservationSystem.Auth;
using TicketReservationSystem.Model;
using TicketReservationSystem.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection(nameof(DatabaseSettings)));
builder.Services.AddSingleton<IDatabaseSettings>(sp => sp.GetRequiredService<IOptions<DatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("DatabaseSettings:ConnectionString")));
builder.Services.AddScoped<IAuthHashService, AuthHashService>();

// user 
builder.Services.AddScoped<IUserService, UserService>();

//train
builder.Services.AddScoped<ITrainService, TrainService>();


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
app.UseAuthorization();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
