# student directory frontend - lesson 6

soft pink catbrainrot-themed react app connected to an express/mongodb backend for auth and student data management.

## setup instructions

### prerequisites
- node.js
- express backend running on http://localhost:3000 connected to mongodb atlas

### installation
1. clone repo:
```bash
git clone <your-github-repo-url>
cd student-directory-frontend

==============================================
install dependencies:

npm install
==============================================

==============================================
start dev server:

npm run dev
open browser at http://localhost:5173
==============================================

==============================================
env variables

backend needs MONGO_URI, JWT_SECRET, and PORT=3000 in .env
frontend connects to http://localhost:3000/api
==============================================

==============================================
reflection questions

1. Why do we store the token in localStorage? What is one security risk of doing so, and what is a more secure alternative?

We save the token in localStorage so the user stays logged in even when refreshing or reopening the page without typing their password every time. The main risk is XSS attacks because any malicious script running in the browser can easily read localStorage and steak the token. A safer way is using HttpOnly secure cookies so JavaScript can't touch the token directly.

2. What is the purpose of the AuthContext? Why not just pass the token as a prop to each component?

AuthContext lets us share the login state, user data, and auth functions across the whole app without having to manually pass props down through every single child component. Doing prop drilling for every page would get messy really fast, so context keeps everything clean and accessible anywhere.

3. What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.

When the token expires, the backend starts sending back 401 Unauthorized errors whenever you try to fetch protected data. Ideally, we'd catch that 401 error automatically, wipe the expired token from localStorage, show a popup saying "Session expired! Please log in again :D", and send the user straight back to /login.

4. What is the difference between the backend's requireAuth middleware and the frontend's ProtectedRoute component? Why do we need both?

The backend requireAuth middleware actually protects the real database data by validating the JWT before returning anything. ProtectedRoute on the frontend is just UI navigation stuff to keep unauthenticated people from seeing pages in the browser. We need both because anyone can bypass frontend checks by editing client code, but only the backend can actually block raw API requests.

==============================================
