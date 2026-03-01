# 🎨 SkillBridge-Frontend

"Connect with Expert Tutors, Learn Anything"

---

## 📌 Overview

SkillBridge Frontend is a responsive web application that allows:

- Students to book tutoring sessions
- Tutors to manage their services
- Admins to monitor the platform

It communicates with the SkillBridge Backend API.

---

## 🔐 Admin credentials

Email: admin@email.com

Password: admin1234

---

## 🛠️ Tech Stack

- Next.js
- Tailwind CSS
- JWT Authentication
- Shadcn

---

## 📁 Project Structure

```bash
src/
 ├── actions/
 |    └──auth/
 |    └──bookings/
 |    └──category/
 |    └──student/
 |    └──tutor/
 |    └──user/
 |
 ├── app/
 │    └── (common)
 │    └── (dashboard)
 |
 ├── components/
 |
 ├── constants/
 │    └── roles.ts
 |
 ├── lib/
 │    └── utils.ts
 |
 ├── providers/
 │    └── ThemeProvider.tsx
 |
 ├── services/
 |    └──auth/
 |    └──bookings/
 |    └──category/
 |    └──student/
 |    └──tutor/
 |    └──user/
 |
 ├── routes/
 │    └── adminRoutes.ts
 │    └── studentRoutes.ts
 │    └── tutorRoutes.ts
 |
 ├── types/
 │    └── index.ts
 │    └── routes.type.ts
 |
 ├── proxy.ts


```

---

## 🚀 Installation & Setup

```bash
# Clone repository
git clone https://github.com/onikd08/skill-bridge-frontend

# Navigate to frontend
cd skill-bridge-frontend

# Install dependencies
npm install

# Start development server
npm run dev

App runs on
http://localhost:3000
```

---

## 🌐 Application Routes

#### Public Routes

| Route         | Description   |
| ------------- | ------------- |
| `/`           | Home          |
| `/tutors`     | Browse tutors |
| `/tutors/:id` | Tutor profile |
| `/login`      | Login         |
| `/register`   | Register      |

#### Student Dashboard

| Route                 | Description     |
| --------------------- | --------------- |
| `/dashboard`          | Overview        |
| `/dashboard/bookings` | Booking history |
| `/dashboard/profile`  | Edit profile    |

#### Tutor Dashboard

| Route                 | Description             |
| --------------------- | ----------------------- |
| `/tutor`              | Overview or update info |
| `/tutor/availability` | Display availability    |
| `/tutor/profile`      | Edit or Set profile     |

#### Admin Dashboard

| Route               | Description       |
| ------------------- | ----------------- |
| `/admin`            | Stats analytics   |
| `/admin/users`      | Manage users      |
| `/admin/bookings`   | View bookings     |
| `/admin/categories` | Manage categories |

---

## 🔐 Authentication Flow

User registers (student or tutor)

JWT token stored in cookies

Protected routes require valid token

Role-based route protection implemented

---

## 🎨Features

#### Public

- Browse tutors
- Search & filter
- View tutor profiles and ratings

#### Student

- Book sessions
- View history
- Leave reviews

#### Tutor

- Manage profile
- Set availability
- View sessions

#### Admin

- Manage users
- View bookings
- Manage categories

---

## 🔗 API Integration

```bash
Base URL:
https://skill-bridge-backend-iota.vercel.app/api
Example:
axios.get("/tutors")
```

---

## 📱 Responsive Design

- Mobile-first design
- Tablet and desktop support
- Clean dashboard UI

---

## 👨‍💻 Author

Anik Das

Skill-Bridge Frontend Application
