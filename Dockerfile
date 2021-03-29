FROM node:14 AS builder

WORKDIR /usr/src/app

COPY ./api/package*.json ./
COPY ./api/tsconfig*.json ./
COPY ./api/src/ ./
RUN npm install && npm run debug:build
# RUN npm ci --quiet && npm run build

FROM node:14
WORKDIR /app
ENV DEBUG=*
# ENV NODE_ENV=production

COPY ./api/package*.json ./
# RUN npm ci --quiet --only=production
RUN npm install

COPY --from=builder /usr/src/app/build ./build

CMD ["node", "/app/build/app.js"]

EXPOSE 3000