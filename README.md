
# Disaster Response Coordination Platform

## Security Note

This project uses environment variables to manage API keys securely.  
The actual `.env` file is not included in this repository or submission ZIP.  
Please rename `.env.example` to `.env` inside the `backend/` directory and fill in your own credentials as required.

Example command:

```

cp backend/.env.example backend/.env

```

---

## Project Overview

A full-stack web application for reporting, verifying, and monitoring disaster events in real-time.  
It includes form-based disaster creation, image verification, social media insight, and official news updates.

---

## Features

- Form to create and update disasters (title, location, description, tags)
- Form to submit image URL for verification
- Displays:
  - Disaster list
  - Social media posts per disaster (mocked)
  - Official news reports (mocked)
  - Image verification result
- Real-time backend support via WebSockets
- Responsive frontend built in React
- All backend APIs tested via Postman

---


## Live Deployments

```
Frontend: https://disaster-response-platform-psi.vercel.app/
Backend: https://disaster-backend-jbk9.onrender.com
```



---

## Tech Stack

- Frontend: React, Axios, CSS
- Backend: Node.js, Express, Supabase (PostgreSQL)
- Mock Integrations: Gemini API (image verification), Mapbox (geolocation), Twitter (social feed)
- Real-time: Socket.IO
- Deployment: 
  - Frontend via Vercel
  - Backend via Render

---

## Project Structure

```

Disaster-Response-Coordination-Platform/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── index.js
│   ├── .env.example       # use this to create .env
│   └── package.json
├── frontend/
│   ├── src/
│   ├── components/
│   └── package.json
├── README.md
└── .gitignore

```

---

## API Testing (Postman)

All backend APIs were tested using Postman. Below are sample screenshots and test cases:

### 1. Create Disaster (POST /api/disasters)
- Inputs: title, location_name, description, tags
- Expected: 201 Created

### 2. Get All Disasters (GET /api/disasters)
- Response: List of all disasters from Supabase

### 3. Get Social Media Posts (GET /api/disasters/:id/social-media)
- Response: Mock tweets based on disaster tags

### 4. Get Official Updates (GET /api/disasters/:id/official-updates)
- Response: Mock news articles

### 5. Image Verification (POST /api/image-verify)
- Inputs: image_url
- Response: Mocked verification result

### Screenshots

![Screenshot From 2025-06-19 19-12-01](https://github.com/user-attachments/assets/2ba9ebf5-bb53-43a1-98c4-a3902c727991)
![Screenshot From 2025-06-19 19-10-24](https://github.com/user-attachments/assets/c61a63b4-ec79-4981-bd0d-10dbd1459fe4)
![Screenshot From 2025-06-19 19-09-59](https://github.com/user-attachments/assets/ac158c66-0977-4c45-acae-fd624349f5dd)
![Screenshot From 2025-06-19 19-09-22](https://github.com/user-attachments/assets/3a9e5e30-39b1-4202-8fce-f8c5ac5b612f)
![Screenshot From 2025-06-19 19-08-05](https://github.com/user-attachments/assets/b5c277e3-a01c-48c6-a039-dce1fc7775f9)
![Screenshot From 2025-06-19 19-07-24](https://github.com/user-attachments/assets/01442ede-def8-4724-b0f9-8b1a587e3ee9)
![Screenshot From 2025-06-19 19-05-39](https://github.com/user-attachments/assets/ac44ae16-abb5-411c-8ec3-bb62acd3ecce)
![Screenshot From 2025-06-19 19-04-59](https://github.com/user-attachments/assets/7088a5c0-aa08-422e-a017-6c9557651ca2)




---

## Backend Setup

```

cd backend
cp .env.example .env
npm install
node index.js

```

Make sure to fill `.env` with your own:

- SUPABASE_URL
- SUPABASE_KEY
- GEMINI_API_KEY

---

## Frontend Setup

```

cd frontend
npm install
npm start

````

Make sure your `frontend/src/api/disaster.js` points to your deployed backend:

```js
const API = axios.create({
  baseURL: 'https://your-backend-url.onrender.com/api',
});
````



## Usage Instructions

1. Go to the deployed frontend or run locally
2. Use the disaster creation form to add a new event
3. Click on any disaster in the list to view:

   * Social media reports (mocked)
   * Official updates (mocked)
   * Image verification results
4. Submit any image URL to test verification functionality

---

## Environment Variables Reference

### backend/.env.example

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_or_ai_studio_key
PORT=5000
```

---

## Notes

* The image verification and geolocation APIs are mocked to simulate real responses.
* Backend supports WebSocket events but frontend is currently polling via user interaction.
* Only `.env.example` is included to guide setup; no actual keys are shared.

---

## Submission Checklist

* [x] Full backend using Node + Supabase
* [x] Frontend built with React
* [x] Disaster creation form
* [x] Social media + news feeds
* [x] Image verification section
* [x] Fully responsive layout
* [x] `.env.example` included
* [x] Deployment completed (Render + Vercel)
* [x] All API routes tested via Postman
* [x] ZIP file prepared without `.env`


