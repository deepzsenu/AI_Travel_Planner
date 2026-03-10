---

# AI Travel Planner – Backend

A production-style backend for an **AI-powered travel planning platform** that allows users to create trips, generate AI itineraries, estimate travel budgets, and interact with an intelligent travel assistant.

The backend is built using **Node.js, Express, MongoDB, and OpenAI**, following **clean architecture and service-layer design patterns**.

---

# Live API

Base URL

[https://ai-travel-planner-84al.onrender.com](https://ai-travel-planner-84al.onrender.com)

Example

GET /api/trips

---

# Key Features

### Authentication

* JWT-based authentication
* Secure password hashing using bcrypt
* Protected routes
* Token-based user sessions

### Trip Management

Users can:

* Create travel plans
* View all their trips
* View trip details
* Update trip information
* Delete trips

Each trip is **securely linked to the authenticated user**.

---

### AI Itinerary Generator

The system generates a **multi-day travel itinerary** using an LLM.

Example output:

Day 1
Visit historical temple
Local street food tour

Day 2
Museum exploration
Local shopping markets

The itinerary is automatically **stored inside MongoDB**.

---

### Budget Estimator

The AI generates approximate travel costs including:

* Flights
* Accommodation
* Food
* Activities
* Total estimated budget

---

### Hotel Recommendation Engine

The AI suggests accommodation types such as:

* Budget hotels
* Mid-range hotels
* Luxury hotels
* Hostels

---

### Editable AI Itinerary

Users can modify specific itinerary days without regenerating the entire trip.

Example:

Regenerate Day 3 with more outdoor activities

This is similar to **modern AI product editing workflows**.

---

### AI Travel Chat Assistant

Users can interact with an AI assistant for travel advice.

Example queries:

What are good cafes near Day 2 location?
What is the best time to visit this place?

The assistant uses:

* Destination
* Trip duration
* Current itinerary
* Chat history

---

### Context-Aware Chat Memory

Conversations are stored in MongoDB so the AI can maintain context across messages.

Example:

User: Good cafes near Day 2 location
AI: Suggests options

User: Any cheaper ones?
AI understands the context.

---

### AI Response Validation Layer

AI outputs are validated before being processed.

This prevents backend crashes when AI responses contain:

* Invalid JSON
* Partial outputs
* Mixed text and JSON

---

# Tech Stack

### Backend

Node.js
Express.js

### Database

MongoDB
Mongoose ODM

### Authentication

JWT
bcrypt

### AI Integration

OpenAI API
Prompt Engineering

### Dev Tools

dotenv
cors
nodemon

---

# Backend Architecture

The backend follows a **layered architecture pattern**.
```
Client (Frontend)
|
REST API
|
Controllers
|
Services
|
Models
|
MongoDB Database
```
---

# Project Structure
```
src

controllers
 --auth.controller.js
 --trip.controller.js

models
 --user.model.js
 --trip.model.js

routes
  --auth.routes.js
  --trip.routes.js

services
  --ai.service.js

middleware
  --auth.middleware.js

utils
  --aiValidator.js

config
 --db.js

server.js
app.js
```
---

# System Architecture Diagram
```
User (Frontend App)
       ↓
Express API Server
       ↓
Authentication Middleware
       ↓
Controllers
       ↓
Services (Business Logic)
       ↓
AI Service Layer
       ↓
MongoDB Database
       ↓
AI Model (OpenAI API)
```
---

# API Documentation

## Authentication

### Register

POST /api/auth/register

Body
```
{
"name": "Deepak",
"email": "[deepak@test.com](mailto:deepak@test.com)",
"password": "123456"
}
```
---

### Login

POST /api/auth/login

Response
```
{
"token": "JWT_TOKEN"
}
```
---

## Trip APIs

### Create Trip

POST /api/trips

Body
```
{
"destination": "Paris",
"days": 5
}
```
---

### Get All Trips

GET /api/trips

Returns all trips for the authenticated user.

---

### Get Single Trip

GET /api/trips/:id

Returns full trip details including:

* itinerary
* hotels
* budget
* chat history

---

### Update Trip

PUT /api/trips/:id

Update trip information.

---

### Delete Trip

DELETE /api/trips/:id

Removes a trip.

---

## AI APIs

### Generate Itinerary

POST /api/trips/:id/generate-itinerary

Generates AI travel plan and stores it in MongoDB.

---

### Chat Assistant

POST /api/trips/:id/chat

Body
```
{
"question": "What are good cafes near Day 2 location?"
}
```
Returns AI-generated answer.

---

# Database Schema

## User Model

Fields

* name
* email
* password
* createdAt

---

## Trip Model

Fields

* destination
* days
* itinerary
* estimatedBudget
* hotels
* user reference
* chatHistory

---

### Chat History Structure

chatHistory
```
[
{
role: "user",
message: "Good cafes near day 2?",
createdAt: Date
},
{
role: "assistant",
message: "Here are some great cafes...",
createdAt: Date
}
]
```
---

# AI Pipeline
```
                User Request
                    ↓
                Controller
                    ↓
                AI Service
                    ↓
                Prompt Engineering
                    ↓
                OpenAI API
                    ↓
                Response Validation
                    ↓
                MongoDB Storage
                    ↓
                API Response
```
---

# Running Locally

Clone the repository
```
git clone https://github.com/deepzsenu/AI_Travel_Planner.git
```
Install dependencies

```
npm install
```
Create `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
OPENAI_API_KEY=your_api_key
```
Run server

```
npm run dev

```
Server runs on

[http://localhost:5000](http://localhost:5000)

---

# Deployment

Hosted on Render

[https://ai-travel-planner-84al.onrender.com](https://ai-travel-planner-84al.onrender.com)

Deployment includes:

* Node.js runtime
* Environment variable management
* MongoDB Atlas database

---

# Future Improvements

Possible production upgrades:

* Redis caching
* Rate limiting
* AI streaming responses
* Collaborative trip planning
* Image-based travel recommendations
* Map integration

---

# Author

Deepak Kumar Saxena

Portfolio
[https://www.deepaksaxena.in](https://www.deepaksaxena.in)

---