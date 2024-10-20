# Rule Engine AST

## Overview

This project is a rule engine system that processes rules and generates an Abstract Syntax Tree (AST). It has a React frontend and a Node.js backend, with a database to store rules.

## Project Structure

Rule_Engine_AST/
├── client/               # Frontend (React.js)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile        # Docker configuration for frontend
│   ├── .env              # Environment variables for frontend
│
├── server/               # Backend (Node.js)
│   ├── config/
│   │   └── db.js         # Database configuration (MySQL or MongoDB)
│   ├── controllers/      # Controller logic
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   │   └── ruleRoutes.js # Routes for rule creation and AST generation
│   ├── utils/
│   │   └── ast.js        # AST-related utility functions
│   ├── server.js         # Main backend entry point
│   ├── package.json
│   ├── Dockerfile        # Docker configuration for backend
│   ├── .env              # Environment variables for backend
│
├── docker-compose.yml    # Docker Compose file to manage multi-container setup
└── README.md             # Project documentation (this file)

## Environment setup

client/.env
REACT_APP_API_URL=http://localhost:5000/api

server/.env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ruleEngine

## Project with Docker
git clone "apna-github repo link"
cd Rule_Engine_AST

cd client
npm install

cd server
npm install

build and start = docker-compose up --build

## Project without Docker

Run Frontend:
cd client
npm install
npm start

Run Backend:
cd server
npm install
npm start

For Database:
start mongodb server : mongod


