import React from 'react';
import './styles/RecipeList.css';
import { useEffect, useState } from 'react';
import {SERVER_IP_ADDRESS, SERVER_PORT} from './ServerConfigs.js';

const POST_REQ_PATH = '/data';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

function RecipeDelete({setAskConfirm}){
    const handleDelete = (event) => {
        setAskConfirm('delete');
    }

    return(
        <button id="Delete-Icon-Btn" onClick={(event) => handleDelete(event)}>
            <img
                    src="img/delete-icon.svg"
                    alt="Trash can delete icon"
                    width="14"
                    height="14"
                    />
        </button>
    );
}

function RecipeLink({recipe_id, setSelectRecipe}){
    const handleClick = () => {
        return setSelectRecipe(recipe_id);
    };
    
    return(
        <button id="View-Recipe-Btn" onClick={(event) => handleClick()}>View Recipe</button>
    );
}

function PopUpConfirmation({recipe_id, askConfirm, setAskConfirm, setRefresh}){
    const confirmDelete = async () => {
        try{
            const response = await fetch(`${SERVER_IP_ADDRESS}:${SERVER_PORT}/recipe/${recipe_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result.message);

            setAskConfirm('confirm');
            setRefresh(prev => !prev);
        } catch(error){
            console.log("An error occurred: " + error);
        }
    };

    const denyDelete = () => {
        setAskConfirm(null);
    };

    if(askConfirm === 'delete'){
        return(
            <div>
                <h2 id="Warning-To-Delete">Are you sure you want to delete recipe?</h2>
                <p>Note: this action cannot be undone!</p>
                <input
                    type="button"
                    id="Warning-Yes-Button"
                    value="Yes"
                    onClick={(event)=> confirmDelete(event)}/>
                <input
                    type="button"
                    id="Warning-No-Button"
                    value="No"
                    onClick={(event) => denyDelete(event)}/>
            </div>
        );
    }
}

function RecipeEntry({recipe_param, setSelectRecipe, refresh, setRefresh}){
    const [askConfirm, setAskConfirm] = useState(null);
    return(
        <div id="recipe-entry-container">
            <h3>{recipe_param.name}</h3>
            <p>Cuisine: {recipe_param.cuisine}</p>
            <p>Ingredients: {recipe_param.main_ingredient}</p>
            <div className="recipe-entry-buttons-div">
                <RecipeLink 
                    recipe_id={recipe_param.id}
                    setSelectRecipe={setSelectRecipe}
                />
                <RecipeDelete
                    recipe_id={recipe_param.id}
                    askConfirm={askConfirm}
                    setAskConfirm={setAskConfirm}
                />
            </div>
            <PopUpConfirmation
                recipe_id={recipe_param.id}
                askConfirm={askConfirm}
                setAskConfirm={setAskConfirm}
                refresh={refresh}
                setRefresh={setRefresh}/>
        </div>
    )
}

function BuildList({recipes_list, setSelectRecipe, refresh, setRefresh}){
    console.log("The Recipes List: ", recipes_list);
    const individual_recipes = [];

    recipes_list.forEach((recipe) => {
        individual_recipes.push(
            <RecipeEntry 
                recipe_param={recipe}
                setSelectRecipe={setSelectRecipe}
                refresh={refresh}
                setRefresh={setRefresh}
                key={recipe.id}
            />
        )
    });
    if(recipes_list[0] == null){
        return(<p>"Add Recipe" in order to view Recipe List</p>);
    }

    return(
        <div id="my-recipe-collection-container">
            <div>{individual_recipes}</div>
        </div>
    );
}

function RecipeList({setSelectRecipe}){
    const [data, setData] = useState(null);
    const [awaitingData, setAwaitingData] = useState(true);
    const [refresh, setRefresh] = useState(false);

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
    }, [refresh]);
    
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
                setSelectRecipe={setSelectRecipe}
                refresh={refresh}
                setRefresh={setRefresh}/>
        </div>
    );
}

export default RecipeList;