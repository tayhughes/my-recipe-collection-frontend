# My Recipe Collection
This is a software that allows a user to keep a collection of recipes. Users have the ability to manually enter recipes, which can then be viewed at a later time when connected to the my-recipe-collection-backend server. 

## Project Creator
This project is created by Taylor Hughes

## Getting Started
Firstly, keep in mind that this is the frontend component of the software. Without the backend component, this software will not function properly.

### The Back-End Server
**Ensure** that the backend server is running or else the front end will have very limited capability, since all the information is fetched from the back end server. 

### Node.js
This project requires Node.js to be installed on the computer running the software. This project uses the React library for implementing the dynamic webpages. All the dependencies can be found in the `package.json`. In order to run the project you will need to make sure all these dependencies are installed, which can be done by running the following command within the root folder of the project.

```bash
$ npm install
```

### The Current Set Up for connecting to Server
To allow the front end to communicate with the server, which has the database of recipe information, you will need to make some updates in the following files to ensure that this connection is reachable:

- `FormPage.js`
- `LoginForm.js`
- `RecipeCard.js`
- `RecipeList.js`

The following is similar to what is declared at the top of the file. The information needs to reflect both the ip address and the port on which the backend server is running.

```js
// Here is an example
const SERVER_IP_ADDRESS = 'http://192.168.1.168';
const SERVER_PORT = '3001';

// ...
```

### Running the Front End
In order to run the front end in your browser you should be able to run 

```bash
# You may need to set the following environment variable
$ export NODE_OPTIONS=--openssl-legacy-provider
```

```bash
# This will create an optimized production build
$ npm run build

# This will run the script that will run the front end
$ npm start
```
Assuming the front-end is running on port 3000 the project will be reachable by opening a web browser and searching for either the `http://localhost:3000` or `http://[router-assigned-ip]:3000`.

## React Component Hierarchy
React is based on components which are rendered to create html pages. Knowing the hierarchy of this application will make it easier to maintain the codebase and to extend functionality. The main component which runs the entire frontend application can be found in the `RecipeApp.js` file.

The desktop layout of the front end can be visualized as a header which contains a navigation bar at the top of the screen, and then a body that contains a list of recipes on the left side of the screen and a recipe view space on the left, and a footer at the bottom of the page.

```
|--------------------------------------|
|            NavigationBar             |
|--------------------------------------|
|   `    |                             |
|        |                             |
| Recipe |                             |
| List   |      RecipeCard             |
|   `    |                             |
|        |                             |
|        |                             |
|--------------------------------------|
|                Footer                |
|--------------------------------------|
```
