# Inside Airbnb ASP.NET Core API

## Starting the project

* Copy .env.example to .env and update the contents.
* Use docker-compose to start the database.
* `` docker-compose up -d ``
* Run `` dotnet watch --project api/api.csproj`` to start the API.

## Command for scaffolding models

Use the following command to create the models based off of the database.
``` dotnet ef dbcontext scaffold "Server=localhost;Database=<DATABASE_HERE>;User Id=sa;password=<PASSWORD_HERE>;Trusted_Connection=False" Microsoft.EntityFrameworkCore.SqlServer -o Models ```
