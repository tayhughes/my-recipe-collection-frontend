import React, {useState} from 'react';
import NavigationBar from './NavigationBar';
import FormPage from './FormPage';
import RecipeList from './RecipeList';
import LoginForm from './LoginForm';
import RecipeCard from './RecipeCard';

function RecipeApp(){
    const [onPage, setOnPage] = useState('');
    const [selectRecipe, setSelectRecipe] = useState(null);
    switch(onPage){
        case "":
        case "home":
            return(
                <div>
                    <NavigationBar
                    setOnPage={setOnPage}/>
                    <RecipeList
                        setSelectRecipe={setSelectRecipe}/>
                    <RecipeCard 
                        selectRecipe={selectRecipe}/>
                </div>
            );
        case "add-recipe":
            return(
                <div>
                    <NavigationBar
                        setOnPage={setOnPage}/>
                    <FormPage/>
                </div>
            );
        case "sign-in":
            return(
                <div>
                    <NavigationBar
                        setOnPage={setOnPage}/>
                    <LoginForm/>
                </div>
            );
        default:
            return(
            <p>Error reload page</p>
            );
    }
}

export default RecipeApp;