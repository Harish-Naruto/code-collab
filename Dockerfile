# ------------------ BASE ------------------
FROM node:20-alpine AS base

WORKDIR /app
COPY .npmrc* .npmrc
COPY pnpm-lock.yaml package.json turbo.json ./
COPY apps ./apps
COPY packages ./packages

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm build-all


# ------------------ FRONTEND ------------------
FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=base /app /app
RUN corepack enable
ENV NODE_ENV=development

WORKDIR /app/apps/frontend
EXPOSE 5173
CMD ["pnpm", "run", "dev"]


# ------------------ API SERVER ------------------
FROM node:20-alpine AS api-server
WORKDIR /app
COPY --from=base /app /app
RUN corepack enable
ENV NODE_ENV=development

WORKDIR /app/apps/api-server
EXPOSE 3000
CMD ["pnpm", "run", "dev"]


# ------------------ WEBSOCKET SERVER ------------------
FROM node:20-alpine AS websocket-server
WORKDIR /app
COPY --from=base /app /app
RUN corepack enable
ENV NODE_ENV=development

WORKDIR /app/apps/websocket-server
EXPOSE 8080
CMD ["pnpm", "run", "dev"]


# ------------------ YJS SERVER ------------------
FROM node:20-alpine AS yjs-server
WORKDIR /app
COPY --from=base /app /app
RUN corepack enable
ENV NODE_ENV=development

WORKDIR /app/apps/yjs-server
EXPOSE 1234
CMD ["pnpm", "run", "dev"]
