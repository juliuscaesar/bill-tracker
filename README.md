# Bill Tracker 🗳️

Hello! Welcome to The Bill Tracker prototype.

## Project structure

The project is split between the `ui` and `api` directories. 

The frontend was created using `create-react-app`. A default "logged in" user is provided in `src/auth/UserContext.js`. I added an additional property `admin: true` for access to the admin panel. You can remove this or set it to false if you'd like. 

In addition to the support/don't support buttons, I added an Undo Support button. It was helpful during the development process and I felt like allowing a user to change their support would be a good feature.

I used ChakraUI to make the frontend nice to look at and accessible. Because Chakra doesn't have thumbs up and thumbs down icons by default I used a checkmark and x icon to indicate support/not supporting instead. Hopefully that's okay! I also added dark mode.

The backend is a simple express server. The bills, engagements, and user data are not persisted to a database. 

## Get it up and running 🚀✨

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
