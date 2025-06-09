This is the **To Do List** app for the KPM Power coding challenge 2025. It is built with React (Vite) and TypeScript.

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


**TO DO LIST:**
1. add localStorage so the data persists
2. change font to "strikethrough" when done for a more satisfying experience
3. make it look nice and responsive to different screen sizes, think about css libraries (tailwind is easiest, but maybe we can just keep it simple with createStylesheet?)
4. think about more visual feedback from a UX perspective 
5. bonus features? (draggable list elements, websockets for live editing, backend?)
6. think about edge cases for unit tests