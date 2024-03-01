# Meower Project

## Introduction

Meower is a Social Media application created to share posts between the Meower community. Once you create your profile, you can start following other users to see what are they up to and chat with them! Like, repost or bookmark some posts and deep dive into this awesome application!

## Features

As a Social application, Meower is designed to connect people and keep them updated. Some of the key features we have are:

- Create a new account
- Follow/unfollow other users
- Create new posts
- Chat with other users
- Tag people in your posts
- Reply on posts
- Do reposts
- Like other users posts
- Bookmark other users posts
- Upload your photo profile
- Upload your background photo
- Search for other users profiles

## Built With

- React
- NodeJS
- ExpressJS
- Socket IO
- MongoDB
- PostgreSQL
- Axios
- Docker (Dev Environment)
- Metabase
- Mailgun
- CSS

## Installation

Copy the repository into your local device. You can find it also in https://github.com/nds-fsd/twitter.git

```bash
  gh repo clone nds-fsd/twitter
```

Install Meower Project with npm

```bash
  npm install
```

Create Docker:

```bash
  docker compose up -d
```

Run the application using this command:

```bash
  npm run dev
```

To execute tests in main folder:

```bash
  npm run start:test
```

To execute tests in backend folder:

```bash
  npm run test
```

Twitter folder .env

```bash
MONGO_INITDB_ROOT_USERNAME = monorepo
MONGO_INITDB_ROOT_PASSWORD = monorepo
POSTGRES_USER = monorepo
POSTGRES_PASSWORD = monorepo
POSTGRES_DB = chat-meower
```

Backend folder .env

```bash
# Mongo
MONGO_URL = mongodb://monorepo:monorepo@localhost:27017/?authMechanism=DEFAULT
# Postgres
POSTGRES_URL = postgres://monorepo:monorepo@localhost:5432/chat-meower
# Mailgun
MAILGUN_KEY = (create account and key in Mailgun page)
# Puerto Express
PORT = 3001
# Tocket JWT
JWT_SECRET = nei1tiweingai4na5quabush4xohC=euya5eiB3z
# Cloudinary (create account in Cloudinary page)
CLOUD_NAME = (your ID)
API_KEY = (your API Key)
API_SECRET = (your Secret)
```

Frontend folder .env

```bash
REACT_APP_BACKEND_URL = http://localhost:3001
```

## UI

### Home

![alt text](image.png)

### Feed

![alt text](image-4.png)

### Profile

![alt text](image-5.png)

### Chat

![alt text](image-7.png)

### Notifications list

![alt text](image-6.png)

## 🔗 Authors

### Miquel Bedia

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/mbedia94)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/miquel-bedia-l%C3%B3pez-72b48a158/)

### Adrián Castán

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/AdrianCastanRuiz)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adri%C3%A1n-cast%C3%A1n-ruiz-7304292b5)

### Cecilia Lorenzo Galarza

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/cecilia-lorenzo)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cecilia-lorenzo-galarza/)

### Elisabeth Resemeiro

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/bethrb2003)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](www.linkedin.com/in/elisabeth-remeseiro-blanch-704005211)

# Other importan information

## Coverage

![alt text](image-1.png)

## Data Base Schema

### PostgreSQL Schema

![alt text](image-3.png)

### MongoDB Schema

![alt text](DB.png)

## Email template

![alt text](image-2.png)

## Color Reference

| Color          | Hex                                                              |
| -------------- | ---------------------------------------------------------------- |
| Main color     | ![#568340](https://via.placeholder.com/10/568340?text=+) #0a192f |
| Color hover    | ![#496d37](https://via.placeholder.com/10/496d37?text=+) #f8f8f8 |
| Sections color | ![#222222](https://via.placeholder.com/10/222222?text=+) #00b48a |
| Sections hover | ![#2f2f2f](https://via.placeholder.com/10/2f2f2f?text=+) #00d1a0 |
