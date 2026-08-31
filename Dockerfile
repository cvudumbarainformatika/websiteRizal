# Stage 1: Build
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN npx quasar build -m ssr

# Stage 2: Production
FROM node:20-alpine AS production-stage
WORKDIR /app

# Hanya butuh dependencies untuk runtime SSR
COPY --from=build-stage /app/dist/ssr/package.json ./
RUN yarn install --production --frozen-lockfile

# Salin hasil build
COPY --from=build-stage /app/dist/ssr ./

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "index.js"]
