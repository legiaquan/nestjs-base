# --- Base Stage ---
FROM node:22-slim AS base

# Install necessary system packages including procps for ps command
RUN apt-get update && apt-get install -y \
    procps \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g bun
WORKDIR /app

COPY bun.lock package.json ./
RUN bun install

COPY . .

# --- Build Stage ---
FROM base AS build
RUN bun run build

# --- Production Stage ---
FROM base AS production
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
CMD ["bun", "run", "start"]

# --- Staging Stage ---
FROM base AS staging
ENV NODE_ENV=staging
COPY --from=build /app/dist ./dist
CMD ["bun", "run", "start"]

# --- Development Stage ---
FROM base AS dev
ENV NODE_ENV=development
COPY --from=build /app/dist ./dist
CMD ["bun", "run", "start"]

# --- Local (Default) Stage ---
FROM base AS local
ENV NODE_ENV=local
CMD ["bun", "run", "start:dev"]