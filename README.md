# Wanderly 🌍

> A modern travel & tour booking platform built with **Next.js 16** and **React 19** — featuring user authentication, tour management, booking system, reviews, blog, newsletter, and more.

![Homepage](https://wanderly-self.vercel.app/wanderly.png)

🔗 **Live:** [wanderly-self.vercel.app](https://wanderly-self.vercel.app/)  
📦 **Repo:** [github.com/rohan-bhau/Wonderly](https://github.com/rohan-bhau/Wonderly)

---

## Tech Stack

![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-9.7-47A248?style=for-the-badge&logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-9.7-880000?style=for-the-badge&logo=mongoose)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtoken)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge&logo=zod)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.81-EC5990?style=for-the-badge&logo=reacthookform)
![Recharts](https://img.shields.io/badge/Recharts-3.9-22B5BF?style=for-the-badge&logo=recharts)
![Lucide React](https://img.shields.io/badge/Lucide_React-1.24-F56565?style=for-the-badge&logo=lucide)
![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-2.6-FF6B6B?style=for-the-badge&logo=react)

## Core Features

- **🔐 User Authentication** — Register, login, JWT-based session management with role-based access (user/admin)
- **🏝️ Tour Management** — Browse, create, edit, and manage tour listings
- **📅 Booking System** — Book tours, view & manage bookings with conflict checking
- **⭐ Reviews & Ratings** — Leave reviews and ratings for tours
- **📝 Blog** — Read and manage blog posts
- **📧 Newsletter** — Newsletter signup via API
- **📬 Contact** — Contact form endpoint
- **📊 Dashboard** — Manage tours & bookings from a personal panel
- **📱 Responsive Design** — Fully responsive UI with Tailwind CSS v4
- **⏳ Loading States** — Skeleton loaders for better UX

## Project Structure

```
frontend/
├── public/                  # Static assets (images, icons)
│   └── wanderly.png         # Homepage preview
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login & register pages
│   │   ├── (marketing)/     # About, contact, blog, terms, privacy
│   │   ├── api/             # API routes (auth, tours, bookings, blog, etc.)
│   │   ├── items/           # Dashboard pages (manage, bookings, add)
│   │   ├── tours/           # Tour listing & detail pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── assets/              # Images (PNG, WebP, JPG)
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, AuthContext
│   │   ├── sections/        # Hero, FeaturedTours, Categories, FAQ, etc.
│   │   └── ui/              # Button, Card, Input, Badge, Skeleton, etc.
│   ├── lib/
│   │   ├── auth.ts          # JWT helpers
│   │   ├── db.ts            # MongoDB connection (cached singleton)
│   │   └── validation/      # Zod schemas (auth, tour, review)
│   ├── models/              # Mongoose models
│   │   ├── User.ts
│   │   ├── Tour.ts
│   │   ├── Booking.ts
│   │   ├── Review.ts
│   │   ├── BlogPost.ts
│   │   └── NewsletterSubscriber.ts
│   └── types/               # Shared TypeScript types
│       └── index.ts
├── next.config.ts           # Next.js config (React Compiler enabled)
├── tailwind.config.ts       # Tailwind CSS v4 config
├── tsconfig.json            # TypeScript strict config
└── eslint.config.mjs        # ESLint flat config
```

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<db>?appName=<app>
JWT_SECRET=<your-secret-key>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Local Setup

```bash
# Clone the repository
git clone https://github.com/rohan-bhau/wanderly.git
cd wanderly/frontend

# Install dependencies
npm install

# Set up environment variables (see above)

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (includes typecheck) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Dependencies

### Production

| Package | Version |
|---------|---------|
| next | ^16.2.10 |
| react | ^19.2.4 |
| react-dom | ^19.2.4 |
| mongoose | ^9.7.4 |
| bcryptjs | ^3.0.3 |
| jsonwebtoken | ^9.0.3 |
| react-hook-form | ^7.81.0 |
| @hookform/resolvers | ^5.4.0 |
| zod | ^4.4.3 |
| lucide-react | ^1.24.0 |
| recharts | ^3.9.2 |
| react-hot-toast | ^2.6.0 |

### Development

| Package | Version |
|---------|---------|
| typescript | ^5 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |
| eslint | ^9 |
| eslint-config-next | ^16.2.10 |
| @types/node | ^20 |
| @types/react | ^19 |
| @types/react-dom | ^19 |
| @types/bcryptjs | ^2.4.6 |
| @types/jsonwebtoken | ^9.0.10 |
| babel-plugin-react-compiler | 1.0.0 |
| tsx | ^4.23.0 |

---

## Author

**MD Rohan Mia**

[![GitHub](https://img.shields.io/badge/GitHub-rohan--bhau-181717?style=for-the-badge&logo=github)](https://github.com/rohan-bhau)

---

Built with [Next.js](https://nextjs.org/) — bootstrapped using `create-next-app`.
