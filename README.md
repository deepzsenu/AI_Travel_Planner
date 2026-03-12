# AI Travel Planner ✈️

An AI-powered travel planning application that helps users generate personalized trip itineraries, estimate travel budgets, and explore destinations intelligently. The platform combines a modern full-stack architecture with an AI assistant that helps users understand and explore their travel plans.

Users can create trips, view detailed itineraries, regenerate activities for specific days, analyze estimated budgets, and interact with an AI assistant to ask questions about their destination.

---

# Project Overview

AI Travel Planner is designed to simplify travel planning using artificial intelligence. Instead of manually researching destinations, activities, and costs, users can generate a structured itinerary instantly.

The application allows users to:

- Register and securely log in
- Create personalized travel plans
- Automatically generate multi-day itineraries using AI
- View recommended hotels and daily activities
- Analyze an estimated budget breakdown
- Regenerate activities for a specific day
- Interact with a contextual AI assistant that answers travel-related questions

The system ensures that every user only sees and manages their own trips, maintaining strong data isolation.

---

# Chosen Tech Stack

## Frontend
- **React.js**
- **React Router**
- **Axios**
- **TailwindCSS**

**Why this stack?**

React enables modular and component-based UI development, making the application scalable and maintainable. TailwindCSS allows rapid UI development with modern responsive designs. Axios simplifies API communication between the frontend and backend.

---

## Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

**Why this stack?**

Node.js and Express provide a lightweight and efficient backend for building REST APIs. MongoDB offers flexible schema design, which works well for storing structured yet dynamic travel itinerary data.

---

## AI Integration
- **OpenAI API**

The AI model generates itineraries, budgets, and answers contextual travel questions through the assistant chatbot.

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/deepzsenu/AI_Travel_Planner.git
cd ai-travel-planner

```
---

2. Backend Setup

Navigate to the backend directory:
```
cd backend
```
Install dependencies:
```
npm install
```
Create a .env file:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
BASEURL=https://api.groq.com/openai/v1
MODEL=llama-3.3-70b-versatile
```
Start the backend server:

npm run dev

Backend runs at:

http://localhost:5000


---

3. Frontend Setup

Navigate to the frontend folder:
```
cd frontend
```
Install dependencies:
```
npm install
```
Create a .env file:
```
VITE_BASEURL = your backend url
```

Start the React application:
```
npm run dev
```
Frontend runs at:
```
http://localhost:5173
```

---

Deployed Application

Backend API:

https://ai-travel-planner-84al.onrender.com

Frontend can be deployed using services such as:

- Vercel

- Netlify

- Render



---

High-Level Architecture

The system follows a client-server architecture.
```
Frontend (React)
      │
      │ REST API
      ▼
Backend (Node.js + Express)
      │
      │
      ├── MongoDB (User & Trip Data)
      │
      └── OpenAI API (AI itinerary generation & assistant)
```
Workflow

1. User sends requests from the React frontend.


2. Backend authenticates the user via JWT.


3. Trip data is stored and retrieved from MongoDB.


4. AI services generate itineraries or respond to travel queries.


5. Responses are returned to the frontend for display.




---

### Authentication and Authorization

The application implements secure authentication using JSON Web Tokens (JWT).

#### Registration

Users create an account using email and password.

#### Login

Upon login:

1. The backend verifies credentials.


2. A JWT token is generated.


3. The token is returned to the client.


### Authorization

Protected API routes require the JWT token in the request header.
```
Authorization: Bearer <token>
```
Middleware verifies the token before allowing access to trip-related endpoints.

This ensures:

 - Users can only access their own trips

 - Secure API communication

 - Stateless authentication



---

### AI Agent Design and Purpose

The AI agent powers two core functionalities.

1. AI Trip Generation

When a user creates a trip, the backend sends travel information such as:

- destination

- number of days

- travel preferences


### The AI generates a structured response containing:

- daily itinerary

- recommended hotels

- estimated budget

- activities for each day


The response is validated and parsed before being stored in the database.


---

2. AI Travel Assistant

- Each trip includes an AI chat assistant.

 - Users can ask questions such as:

   - Explain today's itinerary

   - Suggest famous places near the destination

   - Recommend food or activities

    - Travel tips for the city


The AI assistant receives trip context and responds with helpful travel insights without modifying the itinerary.


---

### Creative / Custom Feature

- Regenerate Day Feature

- Users can regenerate the activities for a specific day in the itinerary.

- If a user is not satisfied with the planned activities, they can click Regenerate, which triggers an AI request that:

- Keeps the trip context

- Generates new activities for the selected day

- Updates only that day's itinerary


This provides flexibility while maintaining the structure of the rest of the trip.


---

### Budget Breakdown Visualization

Each trip displays a budget summary including:
```
Flights

Accommodation

Food

Activities

Total estimated cost
```

A visual distribution bar helps users understand how their budget is allocated.


---

## Floating AI Travel Assistant

A floating chat interface allows users to interact with the AI assistant directly from the trip details page, creating a conversational travel planning experience.


---

Key Design Decisions and Trade-offs

### Structured AI Output

AI responses are designed to return structured JSON rather than plain text. This ensures predictable data parsing and prevents UI rendering issues.


---

### Stateless Authentication

JWT was chosen over session-based authentication because it simplifies API scalability and reduces server-side session management.


---

### Modular Backend Structure

The backend is separated into:

- routes

- controllers

- services

- models


This makes the application easier to maintain and extend.


---

## Frontend Component Architecture

React components are modularized into pages and reusable UI components, allowing easier updates and scalability.


---

#### Known Limitations

- AI-generated itineraries may occasionally produce generic suggestions depending on prompt quality.

- Budget estimates are approximate and not connected to real-time travel pricing APIs.

- The assistant currently relies on AI knowledge rather than live location data.

- The system does not yet include map integration or real-time booking services.

- Chat history is not persisted across sessions.



---

### Future Improvements

- Potential enhancements include:

- Google Maps integration

- Real-time flight and hotel pricing APIs

- Persistent AI conversation history

- Collaborative trip planning

- Mobile optimization

- Advanced AI recommendations based on user preferences



---

#### Conclusion

AI Travel Planner demonstrates how artificial intelligence can enhance travel planning by automating itinerary generation and providing interactive guidance. The project integrates modern frontend technologies, a scalable backend architecture, and AI capabilities to deliver an intelligent and user-friendly travel planning experience.