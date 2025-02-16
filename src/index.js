import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import RecipeList from './RecipeList';
//import reportWebVitals from './reportWebVitals';
import FormPage from './FormPage';

function HomePage(){
  return(
    <div>
      <body>
        <h1>Welcome to the Home Page</h1>
      </body>
    </div>
  );
}

function AboutPage(){
  return(
    <div>
      <h1>Hello About Page world</h1>
    </div>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <FormPage/>
    <RecipeList/>
    <footer>&copy; Taylor Hughes 2025</footer>
    {/* <HomePage/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
