var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();   
builder.Services.AddHttpClient();    

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); 
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowFrontend");


app.MapControllers();

app.Run();
