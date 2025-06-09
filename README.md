This is the **KPM TASKS** app for the KPM Power coding challenge 2025. It is a to-do-list built with React (Vite) and TypeScript. The app allows you to add, edit, delete, and mark list items. It also stores the list in local storage to persist between browser sessions. The lists are also draggable to change the order easily, courtesy of @hello-pangea/dnd library. You can try it [here](kpm-tasks.netlify.app/). 

**Steps to run locally:**
1. Clone or Download the code on Github
2. Make sure you have a package installer like npm or yarn. Use your package installer to install all the dependencies.
```
npm install || yarn install
```
3. Run the app locally by running the run command.
```
npm run dev || yarn run dev
```
4. Play around with the app! If you need to close the server, simply press CTRL + C on the keyboard.

**Testing:**

This app uses Vitest as the test runner and React Testing Library to test the functionality of the components.
To run the unit tests (the test file is in the same level as each component), after installing the node modules, run the following command:
```
npm run test || yarn run test
```

**Deploying the App**
Currently, the app is deployed on Netlify, which clones the github repo and auto updates. The build command is "npm run build" and the publish directory is "/dist". Due to the small size of the app, there is no .yaml file yet, but it may be implemented in the future.


**TO DO LIST:**
1. think about more visual feedback from a UX perspective 
2. bonus features? (websockets for live editing, backend server to track multiple users, docker for consistent deployment, having multiple lists and a dropdown to cycle through them)
3. think about edge cases for unit tests