# 🧠 QuickDeck

QuickDeck is a modern web application that allows users to generate presentation decks from raw text using AI. Authenticated users can input text, choose their target audience, and generate a slide deck preview. The app supports export and preview functionality.

## 🚀 Features

- 🔐 **User Authentication** using Firebase (Email & Password)
- 📝 **Input Text Area** for content to generate slides from
- 🎯 **Target Audience Selector** (Student, Teacher, Professional, etc.)
- 📊 **AI-Powered Slide Generation** (via Gemini API)
- 🔎 **Live Slide Preview**
- 💾 **Export Options** (PDF or download slides)
- 🌗 **Dark Mode Support**
- ⚙️ Built with **Next.js App Router**, **TypeScript**, and **TailwindCSS**

---

## 📸 Screenshots

![QuickDeck Input Page](./public/screenshots/input.png)
![Slide Preview](./public/screenshots/preview.png)
![Auth Modal](./public/screenshots/auth.png)

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **UI**: TailwindCSS & Shadcn/UI
- **Auth**: Firebase Authentication
- **AI**: Gemini API
- **PDF Generation**: html2canvas + jsPDF
- **State & Hooks**: React Hooks

---

## 🔧 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/quickdeck.git
cd quickdeck
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables
Create a .env.local file and add the following:

```bash
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Locally

```bash
npm run dev
```

### 5. 🔐 Authentication

QuickDeck uses Firebase Email/Password auth. Tokens are stored in cookies and validated in middleware for protected routes.


