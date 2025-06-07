# 🧠 SentientGeeks Assignment - Task Management App

A full-stack **Task Management** application built with:

- **Frontend**: Next.js (React)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas

---

## 📁 Project Structure

sentientgeeks-assignment/
├── client # Frontend (Next.js)
└── server # Backend (Node.js + Express)



---

## ⚙️ Environment Configuration

### 1. Clone the Repository

```bash
git clone https://github.com/BapiMajumder1402/sentientgeeks-assignment.git
cd sentientgeeks-assignment
2. Set Up Environment Variables
📦 Server .env
Inside the server/ folder, create a .env file with the following format:


MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>
JWT_SECRET=your_jwt_secret_key
PORT=5000
Replace <username>, <password>, <cluster>, and <database-name> with your actual MongoDB credentials.

🌐 Client .env
Inside the client/ folder, create a .env file:

env

# For local development
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# For production or deployment
NEXT_PUBLIC_API_URL=https://your-deployed-api-url.com/api
🚀 Getting Started
▶️ Start the Backend (Server)

cd server
npm install
npm run dev
Runs at http://localhost:5000

▶️ Start the Frontend (Client)

cd ../client
npm install
npm run dev
Runs at http://localhost:3000
