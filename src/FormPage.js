import React, { useState } from "react";
import './FormPage.css';

const SERVER_IP_ADDRESS = 'http://192.168.1.168';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/submit-data-form';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

const handleChange = (event, setFormData) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));
};


const handleChangeIngredient = (event, indx, setFormData) => {
    const { value } = event.target; // Use `name` to dynamically update the correct field
    setFormData((prevFormData) => {
        const updatedIngredients = [...prevFormData.main_ingr];
        updatedIngredients[indx] = value; // Update the specific index
        return { ...prevFormData, main_ingr: updatedIngredients };
    });
};

const handleAddRow = (event, ingredientListRows, setIngredientListRows) => {
    const updatedValue = ingredientListRows + 1;
    setIngredientListRows(updatedValue);
}

const handleSubtractRow = (event, setFormData, ingredientListRows, setIngredientListRows) => {
    const updatedValue = ingredientListRows - 1;
    setIngredientListRows(updatedValue);
    // let theListIngrCopy = [...formData.main_ingr];
    // theListIngrCopy.pop();
    setFormData((prevFormData) => {
        const updateIngredient = [...prevFormData.main_ingr];
        updateIngredient.pop();
        return {...prevFormData, main_ingr: updateIngredient};
    });
}

const handleSubmit = (event, setConfirmReceived, formData, setFormData) => {
    event.preventDefault(); // Prevent the default form submission behavior

    fetch(SERVER_ADDRESS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Form submitted successfully:", data);
            setConfirmReceived(data.message);
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });

        setFormData({
            food_name: "",
            main_ingr: [],
            cuisine_type: "",
        });
};

function FoodNameTable({formData,setFormData}){
    return(
        <div>
            <label htmlFor="food-name">Food Name</label>
            <input
                type="text"
                id="food-name"
                name="food_name"
                value={formData.food_name || ""}
                onChange={(event) => handleChange(event,setFormData)}
                placeholder="ex. Rosemary Red Potatoes"
                required
            />
        </div>
    );
}

function IngredientListRow({nthIngredient,formData,setFormData}){
    const theName = `main-ingr-${nthIngredient}`;
    const theID = `main-ingr-${nthIngredient}`;
    const theHTMLFor = `main-ingr-${nthIngredient}`;
    const placeholderValue = `ex. Ingredient no. ${nthIngredient + 1}`
    const Title = [];
    if(nthIngredient === 0){
        Title.push(<label htmlFor={theHTMLFor}>Ingredients List</label>);
    }
    return(
        <div>
            {Title}
            <input
                type="text"
                id={theID}
                // id="main-ingr-nthIngredient"
                // name="main_ingr"
                name={theName}
                value={formData.main_ingr[nthIngredient] || ""}
                onChange={(event) => handleChangeIngredient(event, nthIngredient, setFormData)}
                placeholder={placeholderValue}
                required
            /> 
        </div>
    );
}

function IngredientListTable({numberOfRows,formData,setFormData}){
    const rows = [];
    for(let indx = 0; indx < numberOfRows;indx++){
        rows.push(
            <IngredientListRow
                nthIngredient={indx}
                formData={formData}
                setFormData={setFormData}
            />
        );
    }

    return(
        <div>
            {rows}
        </div>
    );
}

function CuisineTypeTable({formData,setFormData}){
    return(
        <div>
            <label htmlFor="cuisine-type">Cuisine Type</label>
            <input
                type="text"
                id="cuisine-type"
                name="cuisine_type"
                value={formData.cuisine_type || ""}
                onChange={(event) => handleChange(event,setFormData)}
                placeholder="ex. American"
                required
            />
        </div>
    );
}

function FormPage() {
    // State to store form data
    const [formData, setFormData] = useState({
        food_name: "",
        main_ingr: [],
        cuisine_type: "",
    });

    const [confirmReceived, setConfirmReceived] = useState('');
    const [ingredientListRows,setIngredientListRows] = useState(1);

    return (
        <div>
        <form onSubmit={(event) => handleSubmit(event, setConfirmReceived, formData, setFormData)}>
            <h2>Recipe Collection</h2>
            <FoodNameTable
                formData={formData}
                setFormData={setFormData}/>
            
            <IngredientListTable
                numberOfRows={ingredientListRows}
                formData={formData}
                setFormData={setFormData}/>

            <input 
                id="add-ingr-row-btn"
                type="button" 
                value="+" 
                onClick={(event) => handleAddRow(event, ingredientListRows, setIngredientListRows)}
            />

            <input 
                id="subtract-ingr-row-btn"
                type="button" 
                value="-" 
                onClick={(event) => handleSubtractRow(event, setFormData, ingredientListRows, setIngredientListRows)}
            />
            
            <CuisineTypeTable
                formData={formData}
                setFormData={setFormData}/>
            
            <input type="submit" value="Add Recipe"/>
        </form>
        <p>{confirmReceived}</p>
        </div>
    );
}

export default FormPage;