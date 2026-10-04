# VisionForge

**VisionForge** is a full-stack AI image-generation web application built with the **MERN stack** and **Hugging Face**.

Users can generate AI images from text prompts, save their generations, view their generation history, download images, and generate images again. Authentication is included so each user's generation history remains private.

## ✨ Features

* 🤖 AI image generation using Hugging Face
* 🔐 User authentication with JWT
* 🖼️ Cloudinary image storage
* 📚 Personal generation history
* 🔄 Generate images again
* ⬇️ Download generated images
* 🗑️ Delete complete generation history
* 🧹 Clear prompt and generated image
* 📱 Responsive design
* ⚡ Loading and error states
* 🔒 Protected API routes
* 🌐 Production-ready frontend/backend structure

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Cookie Parser
* CORS

### AI & Storage

* Hugging Face Inference API
* Cloudinary

## 📁 Project Structure

```text
VisionForge/
│
├── client/
│   ├── src/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── .env
│
├── server/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── server.js
│   └── .env
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone 
```

```bash
cd VisionForge
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 🔑 Environment Variables

### Frontend

Create a `.env` file inside the frontend directory:

### Backend

Create a `.env` file inside the server directory:

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

HF_TOKEN=your_huggingface_token

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONEND_URL=http://localhost:5173
```

> Never commit your `.env` files or API keys to GitHub.

## ▶️ Running the Project

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

## 🔄 How It Works

The basic flow is:

```text
User
  ↓
Enter Text Prompt
  ↓
React Frontend
  ↓
Express Backend
  ↓
Hugging Face
  ↓
AI Generated Image
  ↓
Cloudinary
  ↓
MongoDB
  ↓
Generation History
```

## 🔐 Authentication

VisionForge uses JWT-based authentication.

Authentication is handled using HTTP-only cookies, allowing protected routes to identify the logged-in user.

Protected functionality includes:

* Generation history
* Saving generations
* Deleting history
* User-specific data

Each generation is associated with the authenticated user's ID.

## 📡 API Routes

### Authentication

```http
POST /api/user/register
POST /api/user/login
POST /api/user/logout
```

### Generation History

Get the logged-in user's history:

Every generated image can be associated with the authenticated user.

The history page allows users to:

* View previous generations
* Download generated images
* Generate an image again
* Delete their complete history

Deleting history only removes generations belonging to the currently authenticated user.

## 🚀 Future Improvements

Possible future improvements include:

* Multiple AI image models
* Image-to-image generation
* Image editing
* Prompt enhancement
* Generation settings
* Image aspect ratio selection
* Favorite generations
* Pagination for large histories
* Public image gallery
* Advanced user profiles

## 🎯 Why I Built VisionForge

I built VisionForge as a hands-on project to understand how AI models can be integrated into a real full-stack application.

Instead of only calling an AI API, I wanted to understand the complete flow:

**Authentication → AI generation → Cloudinary storage → MongoDB → User history → Frontend experience**

This project helped me explore **Hugging Face** and understand how AI capabilities can be integrated into modern web applications.

## 👨‍💻 Author

**Bism**

Full-Stack MERN Developer

---

⭐ If you found VisionForge interesting, consider giving the repository a star!
