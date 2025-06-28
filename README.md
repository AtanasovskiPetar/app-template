# App Template: Full Stack Boilerplate

A full stack app template featuring **React**, **NestJS**, and **PostgreSQL (TypeORM)**. This project provides a robust foundation for building scalable web applications, with essential features and best practices included out of the box.

---

## ✨ Features

- **React Frontend**
    - Modular page and component setup
    - Easy-to-extend structure
    - Integrated authentication flows

- **NestJS Backend**
    - Modular architecture
    - Auth module with Passport strategies (local & Google)
    - User module with entities

- **Authentication**
    - Local database login (username/email & password)
    - Google OAuth login
    - Secure JWT-based session management

- **Database**
    - PostgreSQL with TypeORM
    - User entity and migrations included

---

## 🏗️ Project Structure

```
app-template/
├── api/               # NestJS API
│   ├── src/
│   │   ├── auth/      # Auth module (Passport, JWT, Google)
│   │   ├── user/      # User module & entities
│   │   ├── ...
│   │   └── main.ts
│   └── ...
├── ui/                # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── ....
│   │   └── App.tsx
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

1. **Clone the repository**
     ```bash
     git clone https://github.com/AtanasovskiPetar/app-template.git
     ```

2. **Install dependencies**
     ```bash
     cd api && npm install
     cd ../ui && npm install
     ```

3. **Configure environment variables**
     - Copy `.env.example` files in both `api/` and `ui/` and fill in your settings.

4. **Run the app**
     - Start backend: `npm run start:dev` (in `api/`)
     - Start frontend: `npm run start` (in `ui/`)

---

## 🛠️ Main Functionalities

- **Authentication Providers**
    - Local (username/email & password)
    - Google OAuth

- **User Management**
    - Registration, login, and profile endpoints
    - Secure password hashing

- **Frontend**
    - Authenticated routes
    - Example pages and reusable components

---

## 📦 Tech Stack

- **Frontend:** React, TypeScript, Axios
- **Backend:** NestJS, TypeScript, Passport, JWT
- **Database:** PostgreSQL, TypeORM

---

## 📄 License

MIT

---

> Start building your next app faster with this full stack template!