FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN CI=true

RUN npm install

COPY src src

EXPOSE 8080
CMD [ "node", "src/server.js" ]