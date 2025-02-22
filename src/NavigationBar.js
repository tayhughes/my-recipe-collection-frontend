import React from 'react';
import './NavigationBar.css';

const handleNavButtonClick = (event, setValue, to_set) => {
    setValue(`${to_set}`);
};

function NavigationBar({setOnPage}){
    
    return(
        <div id="navbar-div">
            <nav>
                <li
                    onClick={(event) => handleNavButtonClick(event, setOnPage, "home")}>Home</li>
                <li
                    onClick={(event) => handleNavButtonClick(event, setOnPage, "add-recipe")}>Add Recipe</li>
                {/* <li
                    onClick={(event) => handleNavButtonClick(event, setOnPage, "sign-in")}>Sign In</li> */}
            </nav>
        </div>
    );
}

export default NavigationBar;