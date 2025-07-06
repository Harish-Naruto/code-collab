FROM node:20-alpine AS base 

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml package.json turbo.json  ./
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile

RUN pnpm build-all
#-----------------------frontend-----------------------------------------------

FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=base /app .

WORKDIR /app/apps/frontend

EXPOSE 5173

CMD ["pnpm", "dev"]

#-----------------------api-server-----------------------------------------------

FROM node:20-alpine AS api-server
WORKDIR /app
COPY --from=base /app .

WORKDIR /app/apps/api-server

EXPOSE 3000

CMD ["pnpm", "dev"]

#-----------------------websocket-server--------------------------------------------

FROM node:20-alpine AS websocket-server
WORKDIR /app
COPY --from=base /app .

WORKDIR /app/apps/websocket-server

EXPOSE 8080

CMD ["pnpm", "dev"]

#--------------------------yjs-server--------------------------------------------
FROM node:20-alpine AS yjs-server
WORKDIR /app
COPY --from=base /app .

WORKDIR /app/apps/yjs-server

EXPOSE 1234

CMD ["pnpm", "dev"]