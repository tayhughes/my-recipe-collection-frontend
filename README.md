# my-recipe-collection
A way to help learn React JS with Node.js and Express.js being used and PostgreSQL database

This is the FrontEnd of the application

# First Steps is to make sure everything is installed
`npm install`

# From here you can now run the web server frontend from VScode
`npm start`

# in Both `RecipeList.js` and `FormPage.js` files
ensure that the following information is set appropriately with you local IP address
ass assigned by the router you are on, and ensure the PORT/INTERFACE of the backend is correct.

```js
// Here is an example
const SERVER_IP_ADDRESS = 'http://192.168.1.168';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/submit-data-form';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;
```