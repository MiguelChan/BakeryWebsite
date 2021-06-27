FROM node:14 as AppBuilder

ENV CI=true

WORKDIR /usr/src/app

COPY ./lerna.json ./
COPY ./package*.json ./
COPY ./packages ./packages

RUN npm ci && npm run release:install && npm run release

# Final Setup
FROM node:14

WORKDIR /app

ENV DEBUG=*
ENV USE_STATIC_ASSETS=true
ENV SUPPLIERS_URL=$SUPPLIERS_SERVICE_URL

COPY ./packages/web-api/package*.json ./
RUN npm install

COPY --from=AppBuilder ./usr/src/app/packages/web-app/build ./build/website
COPY --from=AppBuilder ./usr/src/app/packages/web-api/build/ ./build

EXPOSE 3030

CMD ["node", "build/src/app.js"]