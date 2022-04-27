FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["blazor/blazor.csproj", "blazor/"]
RUN dotnet restore "blazor/blazor.csproj"
COPY . .
WORKDIR "/src/blazor"
RUN dotnet build "blazor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "blazor.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "blazor.dll"]
