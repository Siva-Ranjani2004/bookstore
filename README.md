# 📚 BookStore Application (MERN + Docker + Jenkins)

## 🚀 Project Overview

This is a full-stack **BookStore web application** built using the **MERN stack (MongoDB, Express, React, Node.js)** and deployed using **Docker & Docker Compose**.

The project also includes a **CI/CD pipeline using Jenkins** to automate build and deployment.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### DevOps Tools

* Docker
* Docker Compose
* Jenkins

---

## ⚙️ Features

* 👤 User Signup & Login
* 📚 View Books (Free & Paid)
* 🖼️ Book Images Display
* 🔐 Authentication System
* 🌐 REST API Integration
* 🐳 Containerized Application
* 🔄 CI/CD Pipeline using Jenkins

---

## 🧱 Project Structure

```
bookstore/
│
├── frontend/        # React Application
├── backend/         # Node.js + Express API
├── docker-compose.yml
└── Jenkinsfile
```

---

## 🐳 Docker Setup

### 1️⃣ Build and Run Containers

```bash
docker-compose up -d --build
```

---

### 2️⃣ Stop Containers

```bash
docker-compose down
```

---

## 🌐 Access the Application

* Frontend → http://<YOUR-IP>:5173
* Backend → http://<YOUR-IP>:4001
* Jenkins → http://<YOUR-IP>:8080

---

## 🔄 CI/CD Pipeline (Jenkins)

Pipeline Stages:

1. Clone Code from GitHub
2. Build Docker Images
3. Run Containers using Docker Compose

---

## 🧪 Sample API Endpoints

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| GET    | /book        | Get all books |
| POST   | /user/signup | Register user |
| POST   | /user/login  | Login user    |

---

## 📦 Sample Data

Books include:

* Web Basics
* React Essentials
* Node.js APIs
* CSS Layout
* Data Structures
* System Design

---

## ⚠️ Common Issues & Fixes

### 1. 500 Internal Server Error

* Check backend logs:

```bash
docker-compose logs backend
```

### 2. MongoDB Not Connecting

* Ensure correct URI:

```
mongodb://mongo:27017/bookstore
```

### 3. API Not Reachable

* Use server IP instead of localhost in frontend

---

## 💡 Future Improvements

* Admin panel to add books
* Image upload support
* Payment integration
* Deployment on cloud (AWS)

---

## 👩‍💻 Author

**Siva Ranjani**

---

## ⭐ Acknowledgement

This project was built as part of a DevOps learning journey integrating:

* Full Stack Development
* Dockerization
* CI/CD Automation

---

## 📌 Conclusion

This project demonstrates:

* End-to-end MERN application development
* Containerization using Docker
* CI/CD pipeline using Jenkins

---
