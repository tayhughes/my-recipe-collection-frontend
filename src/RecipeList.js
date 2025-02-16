import React from 'react';
import './RecipeList.css';
import { useEffect, useState } from 'react';
const SERVER_IP_ADDRESS = 'http://192.168.1.168';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/data';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

function RecipeEntry({recipe_param}){
    return(
        <div id="recipe-entry-container">
            <h3>{recipe_param.name}</h3>
            <p>Main Ingr: {recipe_param.main_ingredient}</p>
            <p>Cuisines: {recipe_param.cuisine}</p>
        </div>
    )
}
function BuildList({recipes_list}){
    console.log("The Recipes List: ", recipes_list);
    // console.log("Length:", recipes_list.length)
    const individual_recipes = [];

    recipes_list.forEach((recipe) => {
        individual_recipes.push(
            <RecipeEntry 
                recipe_param={recipe}
                key={recipe.id}
            />
        )
    });

    return(
        <div id="my-collection-container">
            <h2>List of Recipes</h2>
            <div>{individual_recipes}</div>
        </div>
    );
}
function RecipeList(){
    // const myDataInfo = fetchDataFromServer('http://localhost:3001/data');
    const [data, setData] = useState(null);
    const [awaitingData, setAwaitingData] = useState(true);
    useEffect(() => {
        //fetch('http://192.168.1.168:3001/data') // Replace with your API endpoint
        fetch(SERVER_ADDRESS) // Replace with your API endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Assuming the response is JSON
        })
        .then((data) => {
          setData(data); // Store the response in state
          setAwaitingData(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setAwaitingData(true);
        });
    }, []); // Empty dependency array ensures it runs only once
    // const gettoto = data;
    if(awaitingData){
        return(
            <div>Loading Database...</div>
        )
    }
    
    
    return(
            <div>
                <h2 id="header-above-table">My Collection Table</h2>
                <BuildList recipes_list={data}/>
            </div>
    );
}

export default RecipeList;