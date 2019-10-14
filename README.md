# ExerciseTracker

This repository is my first attempt on a MERN application. I have been following the tutorial of FreeCodeCamp.org to complete this application.

The backend and frontend codes are present in their respective folders. 

Follow the steps to set up the application.

1. cd into the backend folder and do npm install and npm client-install. It will install dependencies for both backend and frontend (not required if application being deployed on Google App Engine).

2. Set up a cluster in Atlas or AWS and provide the connection string in the .env file in backend folder. 

3. If your backend is deployed on EC2 or Google App Engine, then the frontend_backend_gae contains a new version with .yaml files in both the folder. You need to first deploy backend on App Engine, get the URL and place that URL in the .config file inside the client folder. So now frontend has updated ROOT_URL to communicate with backend. 

4. By default backend will run on port 5000 and frontend will run on port 3000 (while running on localhost. Do not forget to replace the URL in the .config file inside the client folder with the http://localhost:5000/ incase of localhost)

5. While in the backend folder, execute npm run dev. It will automatically run both your frontend and backend scripts. 

Watch out for the readme updates...
