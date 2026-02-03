# Web Login Challenge – PT Javis Teknologi Albarokah

Project ini dibuat untuk memenuhi Web Programmer Challenge dengan fitur utama sistem autentikasi login menggunakan JWT + HttpOnly Cookie.

Aplikasi terdiri dari:
- Backend: Node.js + Express
- Frontend: React.js + Vite + TailwindCSS
- Database: MySQL

##  Fitur Utama

- Form Login (Email / Username & Password)
- Validasi form di frontend & backend
- Show / Hide password
- Error handling menggunakan SweetAlert2
- JWT Authentication menggunakan **HttpOnly Cookie**
- Protected Route `/dashboard`
- Logout endpoint
- Rate limit login (5 percobaan / menit / IP)
- Responsive UI (mobile & desktop)
- Clean & modern UI dengan TailwindCSS

---

# Security Implementation

Beberapa praktik keamanan yang diterapkan:

- Password di-hash menggunakan **bcrypt**
- Session login menggunakan **JWT di HttpOnly Cookie** (bukan localStorage)
- Rate limiting untuk mencegah brute force login
- CORS dengan credentials
- `trust proxy` untuk mendukung rate limit di environment production
- Validasi input di frontend dan backend

---

## Arsitektur Project
web-login-challenge
│
├── README.md
├── server
│ ├── routes/auth.js
│ ├── middleware/authMiddleware.js
│ ├── db.js
│ └── index.js
├── serverscreenshots
│   ├── desktop-login-kosong.jpg
│   ├── desktop-username-salah.jpg
│   ├── desktop-password-salah.jpg
│   ├── desktop-login-berhasil.jpg
│   ├── desktop-dashboard.jpg
│   ├── mobile-login.jpg
│   └── mobile-dashboard.jpg
│
└── client
├── src/pages/Login.jsx
├── src/pages/Dashboard.jsx
├── src/ProtectedRoute.jsx
└── src/api.js

## Cara Menjalankan Project

###  Clone Repository

git clone <link-repository>
cd web-login-challenge

## Akun Demo Untuk Login

Gunakan akun berikut untuk mencoba login:

- Email    : admin@mail.com
- Username : admin
- Password : 123456

## Setup Database MySQL

```sql

CREATE DATABASE test_login;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  username VARCHAR(100),
  password VARCHAR(255)
);

INSERT INTO users (email, username, password)
VALUES (
  'admin@mail.com',
  'admin',
  '$2b$10$PF2cI.GMbbpvhkv2AQJRv.MTqFnXYeO6oJO4DKFfGslS6IG6XwZnm'
);

```


## Cara Menjalankan Project

cd server
npm install

buat file .env
isi file .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=test_login
JWT_SECRET=secret_key

npm run dev

Setup Frontend

cd client
npm install
npm run dev

## Screenshot
### Desktop
![Login Kosong](screenshots/desktop-login-kosong)
![Username Salah](screenshots/desktop-username-salah)
![Password Salah](screenshots/desktop-password-salah)
![Login Berhasil](screenshots/desktop-login-berhasil)
![Dashboard](screenshots/desktop-dashboard)

### Mobile
![Login Mobile](screenshots/mobile-login)
![Dashboard Mobile](screenshots/mobile-dashboard)