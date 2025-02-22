import React, {useState, useEffect} from 'react';
import './RecipeCard.css';

const SERVER_IP_ADDRESS = 'http://192.168.1.168';
//const SERVER_IP_ADDRESS = 'http://192.168.0.13';
//const SERVER_IP_ADDRESS = 'http://10.1.10.212';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/recipe_id=';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

function ListIngredientsOrdered({recipe}){
    const filteredIngredients = [];
    for(let i = 0; i < recipe.length; i++){
        let bulletPoint = '';
        for(let j = i; j < recipe.length; j++){
            if(recipe[j] === ','){
                i = j;
                break;
            }
            else{
                bulletPoint = `${bulletPoint}${recipe[j]}`;
                i = j;
            }
        }
        filteredIngredients.push(<li class="recipe-card-list-item-ingr">{bulletPoint}</li>);
    }
    return(
        <ul>{filteredIngredients}</ul>
    );
}

function ListInstructionsOrdered({recipe}){
    const filteredInstructions = [];
    for(let i = 0; i < recipe.length; i++){
        let bulletPoint = '';
        for(let j = i; j < recipe.length; j++){
            if(recipe[j] === ','){
                i = j;
                break;
            }
            else{
                bulletPoint = `${bulletPoint}${recipe[j]}`;
                i = j;
            }
        }
        filteredInstructions.push(<li class="recipe-card-list-item-instruct">{bulletPoint}</li>);
    }
    return(
        <ol>{filteredInstructions}</ol>
    );
}

function RecipeCard({selectRecipe}){
    //select recipe is going to be the number index of the recipe in the database
    const [data, setData] = useState(null);
    const [awaitData, setAwaitData] = useState(true);
    useEffect(() => {
        if(!selectRecipe) return;
        fetch(`${SERVER_ADDRESS}${selectRecipe}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json(); // Assuming the response is JSON
        })
        .then((data) => {
            console.log("The recipe returned to me from db is: ", data);
            setData(data);
            setAwaitData(false);
        })
        .catch((error) => {
            console.error('Error fetching recipe from database, Error:', error);
        });
        }, [selectRecipe]);

    if(awaitData){
        return(<p>Click "view recipe" to see a select recipe</p>);
    }

    return(
        <div id="Recipe-Card-Page-Container">
            <div id="Recipe-Paper-View">
                <h2>{data[0].name}</h2>
                <h3>Ingredients</h3>
                <ListIngredientsOrdered
                    recipe={data[0].main_ingredient}/>
                <h3>Instructions</h3>
                <ListInstructionsOrdered
                    recipe={data[0].main_instructions}
                    />
            </div>
        </div>
    );
}

export default RecipeCard;