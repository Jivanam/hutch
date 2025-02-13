﻿FROM node:lts-alpine as spa_build
WORKDIR /app
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY package.json .
COPY ./app/manager-frontend ./manager-frontend
RUN corepack enable
RUN pnpm --filter manager-frontend install --frozen-lockfile
RUN pnpm --filter manager-frontend build

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./app/HutchManager ./HutchManager
RUN dotnet restore "HutchManager/HutchManager.csproj"
WORKDIR "/src/HutchManager"
RUN dotnet build "HutchManager.csproj" -c Release -o /app/build

FROM build AS publish
COPY --from=spa_build /app/manager-frontend ../manager-frontend
RUN dotnet publish "HutchManager.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HutchManager.dll"]
