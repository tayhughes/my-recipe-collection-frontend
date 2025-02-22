import React, { useState } from "react";
import './FormPage.css';


const SERVER_IP_ADDRESS = 'http://192.168.1.168';
//const SERVER_IP_ADDRESS = 'http://192.168.0.13';
//const SERVER_IP_ADDRESS = 'http://10.1.10.212';
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

const handleChangeInstruction = (event, indx, setFormData) => {
    const { value } = event.target; // Use `name` to dynamically update the correct field
    setFormData((prevFormData) => {
        const updatedInstructions = [...prevFormData.main_instr];
        updatedInstructions[indx] = value; // Update the specific index
        return { ...prevFormData, main_instr: updatedInstructions };
    });
};

const handleAddRow = (event, ingredientListRows, setIngredientListRows) => {
    const updatedValue = ingredientListRows + 1;
    setIngredientListRows(updatedValue);
}

const handleAddInstrRow = (event, numberOfInstructs, setNumberOfInstructs) => {
    const updatedValue = numberOfInstructs + 1;
    setNumberOfInstructs(updatedValue);
}

const handleSubtractRow = (event, setFormData, ingredientListRows, setIngredientListRows) => {
    let updatedValue = 1;
    if(ingredientListRows > 1){
        updatedValue = ingredientListRows - 1;
    }
    setIngredientListRows(updatedValue);
    // let theListIngrCopy = [...formData.main_ingr];
    // theListIngrCopy.pop();
    setFormData((prevFormData) => {
        const updateIngredient = [...prevFormData.main_ingr];
        updateIngredient.pop();
        return {...prevFormData, main_ingr: updateIngredient};
    });
}

const handleSubtractInstrRow = (event, setFormData, numberOfInstructs, setNumberOfInstructs) => {
    let updatedValue = 1;
    if(numberOfInstructs > 1){
        updatedValue = numberOfInstructs - 1;
    }
    setNumberOfInstructs(updatedValue);
    setFormData((prevFormData) => {
        const updateInstruction = [...prevFormData.main_instr];
        updateInstruction.pop();
        return {...prevFormData, main_instr: updateInstruction};
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
            main_instr: [],
            cuisine_type: "",
        });
};

function FoodNameTable({formData,setFormData}){
    return(
        <div>
            <input
                type="text"
                id="food-name"
                name="food_name"
                value={formData.food_name || ""}
                onChange={(event) => handleChange(event,setFormData)}
                placeholder='"Click Here to Add Recipe Title"'
                required
            />
            <p class="recipe-form-line-break"></p>
        </div>
    );
}

function IngredientListRow({nthIngredient,formData,setFormData}){
    const theName = `main-ingr-${nthIngredient}`;
    const theID = `main-ingr-${nthIngredient}`;
    const theHTMLFor = `main-ingr-${nthIngredient}`;
    const placeholderValue = `"Click Here To Add Ingredient No. ${nthIngredient + 1}"`
    const Title = [];
    if(nthIngredient === 0){
        Title.push(<label class={theHTMLFor} htmlFor={theHTMLFor}>Ingredients</label>);
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

function InstructionListRow({nthInstruction, formData, setFormData}){
    const theName = `main-instr-${nthInstruction}`;
    const theID = `main-instr-${nthInstruction}`;
    const theHTMLFor = `main-instr-${nthInstruction}`;
    const placeholderValue = `"Click Here To Add Instruction No. ${nthInstruction + 1}"`
    const Title = [];
    if(nthInstruction === 0){
        Title.push(<label class={theHTMLFor} htmlFor={theHTMLFor}>Instructions</label>);
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
                value={formData.main_instr[nthInstruction] || ""}
                onChange={(event) => handleChangeInstruction(event, nthInstruction, setFormData)}
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
        <div class="list-of-items">
            {rows}
        </div>
    );
}

function InstructionListTable({numberOfInstructs,formData,setFormData}){
    const rows = [];
    for(let indx = 0; indx < numberOfInstructs;indx++){
        rows.push(
            <InstructionListRow
                nthInstruction={indx}
                formData={formData}
                setFormData={setFormData}
            />
        );
    }
    return(
        <div class="list-of-items">
            {rows}
        </div>
    );
}

function CuisineTypeTable({formData,setFormData}){
    return(
        <div class="cuisine-type-container">
            <label class="cuisine-type" htmlFor="cuisine-type">Cuisine Type</label>
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
        main_instr: [],
        cuisine_type: "",
    });

    const [confirmReceived, setConfirmReceived] = useState('');
    const [ingredientListRows,setIngredientListRows] = useState(1);
    const [numberOfInstructs, setNumberOfInstructs] = useState(1);

    
        return (
            <div>
            <form onSubmit={(event) => handleSubmit(event, setConfirmReceived, formData, setFormData)}>
                <FoodNameTable
                    formData={formData}
                    setFormData={setFormData}/>

                <IngredientListTable
                    numberOfRows={ingredientListRows}
                    formData={formData}
                    setFormData={setFormData}/>
                <div id="add-ingr-row-button-container">
                    <input 
                        id="add-ingr-row-btn"
                        class="add-subtract-row"
                        type="button" 
                        value="+" 
                        onClick={(event) => handleAddRow(event, ingredientListRows, setIngredientListRows)}
                    />

                    <input 
                        id="subtract-ingr-row-btn"
                        class="add-subtract-row"
                        type="button" 
                        value="-" 
                        onClick={(event) => handleSubtractRow(event, setFormData, ingredientListRows, setIngredientListRows)}
                    />
                </div>

                <InstructionListTable
                    numberOfInstructs={numberOfInstructs}
                    formData={formData}
                    setFormData={setFormData}/>

                <div id="add-instruct-row-button-container">
                    <input 
                        id="add-instr-row-btn"
                        type="button" 
                        value="+" 
                        onClick={(event) => handleAddInstrRow(event, numberOfInstructs, setNumberOfInstructs)}
                    />

                    <input 
                        id="subtract-instr-row-btn"
                        type="button" 
                        value="-" 
                        onClick={(event) => handleSubtractInstrRow(event, setFormData, numberOfInstructs, setNumberOfInstructs)}
                    />
                </div>

                <CuisineTypeTable
                    formData={formData}
                    setFormData={setFormData}/>

                <input type="submit" value="Save Recipe"/>
            </form>
            <p>{confirmReceived}</p>
            </div>
        );
    
}

export default FormPage;