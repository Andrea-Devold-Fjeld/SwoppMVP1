# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs



FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SwoppMVP1.Server/SwoppMVP1.Server.csproj", "SwoppMVP1.Server/"]
COPY ["swoppmvp1.client/swoppmvp1.client.esproj", "swoppmvp1.client/"]
RUN dotnet restore "./SwoppMVP1.Server/SwoppMVP1.Server.csproj"
COPY . .
WORKDIR "/SwoppMVP1/SwoppMVP1.Server"
RUN dotnet build "./SwoppMVP1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN mkdir -p ~/.aspnet/https
RUN dotnet --info
RUN ls -la /SwoppMVP1/SwoppMVP1.Server
RUN dotnet publish "./SwoppMVP1.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /SwoppMVP1/publish .
ENTRYPOINT ["dotnet", "SwoppMVP1.Server.dll"]
