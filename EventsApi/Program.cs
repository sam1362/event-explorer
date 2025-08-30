var builder = WebApplication.CreateBuilder(args);

// ✅ Add services to the container
builder.Services.AddControllers();   // برای پشتیبانی از Controller
builder.Services.AddHttpClient();    // برای استفاده از HttpClient

var app = builder.Build();

// ✅ Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // خطاهای بهتر در حالت Development
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowFrontend");

// ✅ تمام Controllerها (مثل EventsController) اینجا مپ می‌شن
app.MapControllers();

app.Run();
