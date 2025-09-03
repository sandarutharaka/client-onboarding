# Client Onboarding Form

A **Client Onboarding Form** built with **Next.js (App Router)**, **React Hook Form**, **Zod**, and **Tailwind CSS** for the frontend, and a lightweight **Express.js backend** for handling submissions.

🔗 **Live Demo (Frontend on Vercel):** [https://client-onboarding-hz5m.vercel.app/](https://client-onboarding-hz5m.vercel.app/)

The form validates user inputs, persists values on errors, updates the URL query param when services are selected, and submits the data to a backend API (deployed on Render).

---

## ✨ Features

- **Frontend Validation (Zod + React Hook Form)**

  - Full Name: required, 2–80 chars, letters/spaces/'/- only
  - Email: required, valid email
  - Company Name: required, 2–100 chars
  - Services: required, choose ≥1
  - Budget (USD): optional, integer 100–1,000,000
  - Project Start Date: required, today or later
  - Accept Terms: required checkbox

- **User Experience**

  - Inline error messages
  - Disabled submit button while submitting
  - Values persist on validation errors
  - Success and error banners for feedback
  - Keyboard navigable with visible focus states

- **Dynamic URL behavior**

  - Selected services update the query param:  
    `/?service=UI/UX,Web%20Dev`
  - Services pre-fill when query params are present

- **Backend API**
  - Receives POST requests with JSON data
  - Validates presence of required fields
  - Responds with success or error messages

---

## 🗂️ Folder Structure
```
client-onboarding-form/
├─ client/ # Next.js frontend
│ ├─ public/
│ ├─ src/
│ │ ├─ app/ # Main Next.js pages
│ │ ├─ components/ # Reusable UI components
│ │ └─ lib/ # Zod schemas, helpers
│ ├─ .env.local # Environment variables (frontend)
│ ├─ package.json
│ └─ ...
│
├─ server/ # Express.js backend
│ ├─ server.js # Backend entry point
│ ├─ package.json
│ └─ ...

```

---

## 🚀 Tech Stack

- **Frontend**

  - Next.js 13+ (App Router)
  - React Hook Form
  - Zod + `@hookform/resolvers/zod`
  - Tailwind CSS

- **Backend**

  - Node.js
  - Express.js
  - CORS + JSON middleware

- **Deployment**
  - Frontend → **Vercel**
  - Backend → **Render**

---

## ⚡ Setup & Run Locally

1. **Clone the repository**

git clone https://github.com/sandarutharaka/client-onboarding.git
cd client-onboarding-form
`

2. **Setup the backend**

cd server
npm install
npm start

The backend will start on [http://localhost:5000](http://localhost:5000).

3. **Setup the frontend**

cd ../client
npm install

4. **Configure environment variables**

Create a `.env.local` file inside `/client`:

NEXT_PUBLIC_ONBOARD_URL=http://localhost:5000/api/onboard

5. **Run the frontend**

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 How Validation & Submission Work

- **Validation**
  All inputs are validated with **Zod**. If validation fails, error messages are displayed inline and user input is preserved.

- **Submission**
  On submit, form data is serialized into JSON and sent via a **POST request** to the backend API.

  - ✅ On success: a **success banner** appears and the form resets.
  - ❌ On error (non-2xx or network issue): an **error banner** is shown.

This ensures clear feedback for the user at every step.

---

## 🌍 Deployment Notes

- **Frontend (V)**

  - Connect the `client/` folder to Vercel.
  - Make sure environment variables (e.g. `NEXT_PUBLIC_ONBOARD_URL`) are set in Vercel dashboard to point to the Render API.

- **Backend (Render)**

  - Deploy the `server/` folder as a Node.js web service.
  - Expose `/api/onboard` endpoint.
  - Update the frontend `.env.local` (and Vercel settings) with the live Render URL.

---

## 📩 Summary

- ✅ Fully functional **client onboarding form** with validation and nice UX
- ✅ **Frontend:** Next.js + React Hook Form + Zod + Tailwind
- ✅ **Backend:** Express.js REST API
- ✅ **Deployments:** Vercel (frontend) + Render (backend)
- ✅ Success & error handling with banners
- ✅ Dynamic query params for services

🔗 **Live Demo (Frontend):** [https://client-onboarding-hz5m.vercel.app/](https://https://client-onboarding-hz5m.vercel.app/)
