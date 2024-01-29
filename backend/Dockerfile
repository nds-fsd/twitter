FROM node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install


COPY src src

EXPOSE 8000
CMD [ "node", "src/index.js" ]