[![Node.js CI/CD](https://github.com/carlosmaccarrone/personal-library-nodejs-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/personal-library-nodejs-backend/actions/workflows/ci.yml)

# 📚 Personal Library Node.js Backend

Node.js backend for the personal book library, with REST API and object mapping using Sequelize. This project includes unit and integration tests with Jest and Supertest.

The application runs in Docker containers alongside the database and communicates through a shared Docker network.

---

## ⚙️ Technologies

- Node.js
- Express
- Sequelize ORM
- PostgreSQL
- Jest (unit & integration tests)
- Supertest (API testing)
- Docker & Docker Compose

---

## 💡 Features

- RESTful API for managing books, authors, and genres
- Sequelize models with associations
- Mocked unit tests to avoid touching the real database
- Integration tests for API endpoints
- Dockerized setup for local development

---

## 🗄️ Database Model

- **Authors** – authors
- **Genres** – genres
- **Books** – books
- **Book_Author** – book ↔ author relationship (many-to-many)
- **Book_Genre** – book ↔ genre relationship (many-to-many)

---

## 🔗 Prerequisites

### 1. Global Docker Network

Create a global network and set up the database model:
```bash
docker network create --driver bridge --attachable library_net
git clone https://github.com/carlosmaccarrone/personal-library-db.git
cd personal-library-db
docker-compose up -d
```
This will create a network shared by both projects (backend & database) and will start the database in the background.

---

## 🚀 Running the Project

### 1. Clone the Backend and run it.

```bash
git clone https://github.com/carlosmaccarrone/personal-library-nodejs-backend.git
cd personal-library-nodejs-backend
```

### 2. Run the app.
```bash
docker-compose build
```

## 📖 Main Endpoints  

🔹 Authors  
	`GET /api/authors` → List all authors  
	`GET /api/authors/:id` → Bring in an author by author_id  
	`POST /api/authors` → Create an author  
	`PUT /api/authors/:id` → Update an author  
	`DELETE /api/authors/:id` → Delete an author  

🔹 Books  
	`GET /api/books` → List all books  
	`GET /api/books/:isbn` → Bring a book by ISBN  
	`POST /api/books` → Create a book  
	`PUT /api/books/:isbn` → Update a book  
	`DELETE /api/books/:isbn` → Delete a book  

🔹 Genres  
	`GET /api/genres` → List all genres  
	`GET /api/genres/:id` → Bring a genre by genre_id  
	`POST /api/genres` → Create a genre  
	`PUT /api/genres/:id` → Update a genre  
	`DELETE /api/genres/:id` → Delete a genre  

🔹 Relaciones (Many-to-Many)  
	`GET /books/:isbn/authors` → List of authors of a book  
	`GET /books/:isbn/genres` → List of genres of a book  
	`POST /books/:isbn/authors` → Associate an author with a book  
	`POST /books/:isbn/genres` → Associate a genre with a book  

---

## 🧪 Test

### 1. Setup node app in background:
```bash
docker-compose up -d
```

### 2. Search node container:
```bash
docker ps
CONTAINER ID   IMAGE                  NAMES
xxxxxxx        personal-library-node  backend-1
```

### 3. Run tests:
```bash
docker exec -it backend-1 bash
npm test
```

---

## 👨‍💻 Developed by Carlos Maccarrone