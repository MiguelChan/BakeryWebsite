# Let's build the API.
FROM node:14 AS APIBuilder

WORKDIR /usr/src/app

COPY ./api/package*.json ./
COPY ./api/tsconfig*.json ./
COPY ./api/src/ ./api/src
RUN npm install && npm run build

# Let's Build the Actual Website
FROM node:14 as WebsiteBuilder

WORKDIR /usr/src/app

COPY ./frontend-app/package*.json ./
COPY ./frontend-app/tsconfig*.json ./
COPY ./frontend-app/src ./src
COPY ./frontend-app/public ./public

RUN npm install && npm run build

# Final Setup
FROM node:14

WORKDIR /app

ENV DEBUG=*
ENV USE_STATIC_ASSETS=true

COPY ./api/package*.json ./
RUN npm install

COPY --from=APIBuilder ./usr/src/app/build/ ./build
COPY --from=WebsiteBuilder ./usr/src/app/build ./build/website

CMD ["node", "build/app.js"]

EXPOSE $PORT