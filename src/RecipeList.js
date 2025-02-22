import React from 'react';
import './RecipeList.css';
import { useEffect, useState } from 'react';
//const SERVER_IP_ADDRESS = 'http://192.168.1.168';
//const SERVER_IP_ADDRESS = 'http://192.168.0.13';
const SERVER_IP_ADDRESS = 'http://10.1.10.212';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/data';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

function RecipeLink({recipe_id, setSelectRecipe}){
    const LinkToFollow = `${SERVER_IP_ADDRESS}:${SERVER_PORT}/recipe_id=${recipe_id}`;
    const handleClick = () => {
        return setSelectRecipe(recipe_id);
    }
    
    // return(
    //     <a href={LinkToFollow} rel="noopener noreferrer" target="_blank"><button>View Recipe</button></a>
    // );
    return(
        <button onClick={(event) => handleClick()}>View Recipe</button>
    );
}

function RecipeEntry({recipe_param, setSelectRecipe}){
    return(
        <div id="recipe-entry-container">
            <h3>{recipe_param.name}</h3>
            <p>Cuisine: {recipe_param.cuisine}</p>
            <p>Ingredients: {recipe_param.main_ingredient}</p>
            <RecipeLink 
                recipe_id={recipe_param.id}
                setSelectRecipe={setSelectRecipe}
            />
        </div>
    )
}

function BuildList({recipes_list, setSelectRecipe}){
    console.log("The Recipes List: ", recipes_list);
    const individual_recipes = [];

    recipes_list.forEach((recipe) => {
        individual_recipes.push(
            <RecipeEntry 
                recipe_param={recipe}
                setSelectRecipe={setSelectRecipe}
                key={recipe.id}
            />
        )
    });

    return(
        <div id="my-recipe-collection-container">
            <div>{individual_recipes}</div>
        </div>
    );
}

function RecipeList({setSelectRecipe}){
    const [data, setData] = useState(null);
    const [awaitingData, setAwaitingData] = useState(true);
    
    useEffect(() => {
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
    
    if(awaitingData){
        return(
            <div>Loading Database...</div>
        )
    }
    
    return(
        <div id="View-Recipe-List-Container">
            <h2 id="header-above-table">Recipes List</h2>
            <BuildList 
                recipes_list={data}
                setSelectRecipe={setSelectRecipe}/>
        </div>
    );
}

export default RecipeList;