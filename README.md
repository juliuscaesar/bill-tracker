# Bill Tracker 🗳️

Hello! Welcome to The Bill Tracker prototype.

![Citizen Dashboard](https://raw.githubusercontent.com/juliuscaesar/bill-tracker/main/image.png)

## Project structure

The project is split between the `ui` and `api` directories. 

The frontend was created using `create-react-app`. A default "logged in" user is provided in `src/auth/UserContext.js`. I added an additional property `admin: true` for access to the admin panel. You can remove this or set it to false if you'd like. 

In addition to the support/don't support buttons, I added an Undo Support button. It was helpful during the development process and I felt like allowing a user to change their support would be a good feature. I used ChakraUI to make the frontend nice to look at and accessible.

The backend is a simple express server. The bills, engagements, and user data are not persisted to a database. 

## Get it up and running 🚀✨

- Run `npm install` in the root, ui, and api directories
- Run `npm start` in the root directory
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
