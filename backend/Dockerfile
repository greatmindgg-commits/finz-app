FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:20-alpine
# Patch base OS packages (fixes openssl CVEs)
RUN apk --no-cache upgrade
# Remove npm/yarn/corepack - not needed at runtime, and they carry CVEs
RUN rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/npx \
    /usr/local/bin/corepack /opt/yarn* /usr/local/bin/yarn /usr/local/bin/yarnpkg
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY src/ ./src/
USER appuser
EXPOSE 5000
CMD ["node", "src/index.js"]
