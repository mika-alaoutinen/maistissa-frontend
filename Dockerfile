# Build stage
FROM node:14-alpine AS build
WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

# Application binary
FROM node:14-alpine
WORKDIR /app

COPY package*.json .

RUN npm i --only=production
RUN npm i -g serve
COPY --from=build /app/build ./build

RUN addgroup -g 1001 -S react
RUN adduser -u 1001 -S react -G react
USER react

EXPOSE 3000

CMD [ "serve", "-s", "-l", "3000", "build" ]
