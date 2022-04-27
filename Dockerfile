FROM mcr.microsoft.com/azure-sql-edge:latest
WORKDIR /db
COPY airbnb2021.bacpac .