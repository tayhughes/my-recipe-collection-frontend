import React, { useState } from "react";
import './FormPage.css';

const SERVER_IP_ADDRESS = 'http://192.168.1.168';
const SERVER_PORT = '3001';
const POST_REQ_PATH = '/submit-data-form';
const SERVER_ADDRESS = `${SERVER_IP_ADDRESS}:${SERVER_PORT}${POST_REQ_PATH}`;

function FormPage() {
    // State to store form data
    const [formData, setFormData] = useState({
        food_name: "",
        main_ingr: "",
        cuisine_type: "",
    });
    const [confirmReceived, setConfirmReceived] = useState('');

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // fetch("http://192.168.1.168:3001/submit-data-form", {
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
                main_ingr: "",
                cuisine_type: "",
            });
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h2>Recipe Collection</h2>
            <label htmlFor="food-name">Food Name</label>
            <input
                type="text"
                id="food-name"
                name="food_name"
                value={formData.food_name || ""}
                onChange={handleChange}
                placeholder="ex. Rosemary Red Potatoes"
                required
            />
            
            <label htmlFor="main-ingr">Main Ingredient</label>
            <input
                type="text"
                id="main-ingr"
                name="main_ingr"
                value={formData.main_ingr || ""}
                onChange={handleChange}
                placeholder="ex. Red Potatoes"
                required
            />
            
            <label htmlFor="cuisine-type">Cuisine Type</label>
            <input
                type="text"
                id="cuisine-type"
                name="cuisine_type"
                value={formData.cuisine_type || ""}
                onChange={handleChange}
                placeholder="ex. American"
                required
            />
            
            <input type="submit" value="Add Recipe"/>
        </form>
        <p>{confirmReceived}</p>
        </div>
    );
}

export default FormPage;