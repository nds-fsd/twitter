FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY backend backend
RUN npm install

WORKDIR /usr/src/app/backend


EXPOSE 8000
CMD [ "node", "src/index.js" ]