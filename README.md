# Chatbot AI Application

## Overview

This project is a chatbot application that uses OpenAI's GPT-3.5-turbo model to provide AI-powered responses. The application consists of a Flask backend and a React frontend, all containerized using Docker for easy deployment and scalability.

### Features

- **AI Chatbot**: Leverages OpenAI's GPT-3.5-turbo for conversational AI.
- **Frontend**: Built with React to provide a modern and interactive chat interface.
- **Backend**: Powered by Flask, handling API requests and communicating with OpenAI's API.
- **Dockerized**: Both frontend and backend are containerized using Docker for consistency and ease of deployment.

## Technologies Used

- **Frontend**:

  - React
  - Axios for API requests
  - Docker for containerization

- **Backend**:
  - Flask for the web framework
  - Flask-CORS for handling cross-origin requests
  - Python-Dotenv for managing environment variables
  - OpenAI Python SDK for AI interactions
  - Docker for containerization

## Setup Instructions

### Prerequisites

- Docker installed on your machine
- Docker Compose installed
- OpenAI API key (add it to the `.env` file in the backend directory)

### Steps to Run the Application

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/alexsantelli/chatbotAI.gitgit
   cd chatbotAI

   ```

2. **Add ENV file**
   Add a .env file into backend/
   OPENAI_API_KEY=your_openai_api_key

3. **Run App**
   docker-compose up --build

### Explanation:

- The `.env` file should contain your OpenAI API key.
- Run `docker-compose up --build` to start both the frontend and backend services.

After these steps, you should be able to access the app on `http://localhost:3000`.
