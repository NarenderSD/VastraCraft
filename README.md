<p align="center">
  <img src="public/logo2.png" alt="Premium Tailoring Logo" width="180" />
</p>

<h1 align="center">Premium Tailoring Website</h1>

---

<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=28&pause=1000&color=E11D48&center=true&vCenter=true&width=700&lines=Premium+Tailoring+for+Modern+India;Business-Ready+Admin+Dashboard;Live+Bookings+%7C+Portfolio+%7C+Testimonials;Built+for+Growth+and+Creativity"/>
</div>

---

## ✨ About Premium Tailoring Website

A **premium, professional, and creative platform** for bespoke tailoring studios, designed for real business use in India and beyond.

- 🧵 **Modern, elegant UI** with real business branding
- 🛠️ **Admin dashboard** for live management of bookings, contacts, portfolio, testimonials, and images
- 🔒 **Secure authentication** for admins
- 📱 **Mobile-first, fully responsive, and lightning-fast**
- 🌐 **SEO-optimized** and ready for real-world deployment
- ☁️ **Cloud image management** (Cloudinary)
- 🇮🇳 **Tailored for Indian fashion and culture**
- 📄 **PDF Export** for size guide and booking slips

---

## 🚀 Features

- 🎨 **Stunning Hero Section** with premium images and animated cloth showcase
- 🖼️ **Portfolio Gallery**: Add, edit, and manage your best work
- 💬 **Customer Testimonials**: Build trust with real stories
- 📅 **Live Booking System**: Accept and manage appointments
- 📝 **Blog & Content Management**
- 📞 **Contact & WhatsApp Integration**
- 🛡️ **Admin Panel**: Full CRUD for all business data
- 🔐 **JWT Auth**: Secure login, registration, and session management
- ☁️ **Cloudinary Integration**: Fast, reliable image uploads
- 📄 **PDF Export**: Download size guides and booking slips as beautiful PDFs
- 🏆 **Business-Ready**: Clean code, scalable, and easy to deploy

---

## 🖼️ Screenshots

> _Add your own screenshots here!_

| Home Page | Admin Dashboard | Booking Flow |
|-----------|----------------|-------------|
| ![](public/hero1.png) | ![](public/hero2.png) | ![](public/hero3.png) |

---

## 🛠️ Tech Stack

- Next.js, React, MongoDB, Cloudinary, Tailwind CSS, Vercel, JWT

---

## 📦 Project Structure

```
app/
  ├── admin/           # Admin dashboard (login, register, managers)
  ├── api/             # All backend API routes (auth, bookings, portfolio, etc.)
  ├── ...              # Frontend pages (home, about, portfolio, etc.)
components/            # UI and business components
public/                # Images, logos, and static assets
styles/                # Global styles (Tailwind)
.env.example           # Environment variable template
SETUP_INSTRUCTIONS.md  # Full setup guide
```

---

## ⚡ Quick Start

1. **Clone the repo:**
    ```bash
    git clone https://github.com/your-username/premium-tailoring-website.git
    cd premium-tailoring-website
    ```
2. **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    # or
    yarn install
    ```
3. **Setup environment:**
   - Copy `.env.example` to `.env` and fill in your credentials
   - See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for full details
4. **Run locally:**
    ```bash
    pnpm dev
    # or
    npm run dev
    # or
    yarn dev
    ```
5. **Deploy:**
   - Deploy to Vercel, Netlify, or your preferred platform
   - Set the same environment variables in your deployment dashboard

---

## 🔑 Environment Variables

See [.env.example](./.env.example) for all required variables:
- `MONGO_URI` – MongoDB connection string
- `JWT_SECRET` – JWT secret for authentication
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – Cloudinary credentials

---

## 👩‍💻 Admin & API

- **Register:** `/admin/register`
- **Login:** `/admin/login`
- **Dashboard:** `/admin`
- **API:** All endpoints under `/api/` (RESTful, secure)

---

## 🙏 Credits & Acknowledgments

- All images are copyright-free or provided by the owner
- Built with ❤️ using Next.js, MongoDB, and Tailwind CSS
- Inspired by the best of Indian tailoring and global design
- **Build by [Narender Singh](https://www.linkedin.com/in/narender-singh-1b7b2b1b2/)**

---

## 📝 License

MIT

---

## 🚀 Push to GitHub

1. **Stage all changes:**
    ```bash
    git add .
    ```
2. **Commit:**
    ```bash
    git commit -m "Finalize premium tailoring website: fully responsive, premium admin, all flows working"
    ```
3. **Push:**
    ```bash
    git push origin main
    ```

---

<p align="center" style="font-size: 1.2em; font-weight: bold; color: #e11d48;">
  Built by <a href="https://www.linkedin.com/in/narender-singh-1b7b2b1b2/" target="_blank">Narender Singh</a>
</p> 