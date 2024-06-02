const coffeeContainer = document.getElementById("coffeeContainer");
const fetchCoffeeButton = document.getElementById("fetch-coffee");
const fetchTranslationButton = document.getElementById("fetch-translation");

const coffeeURL = "https://api.sampleapis.com/coffee/hot";
const translateURL = "https://translate-424302.uc.r.appspot.com/";

if(!coffeeContainer || !fetchCoffeeButton || !fetchTranslationButton) {
    console.error("One or more elements are not found in the DOM");
} else {
    let currentDrinkDetails = "";


    async function translate(url, language, text) {
        try {
            console.log("Translate URL:", url);
            console.log("Translate Language:", language);
            console.log("Translate Text:", text);
    
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }, 
                body: JSON.stringify({
                    text: text,
                    language: language,
                }),
            });
    
            if(!response.ok) {
                const errorText = await response.text();
                console.error("Translation API error:", errorText)
                throw new Error("Network reponse was not ok");
                }
    
                const data = await response.json();
                console.log("Translation API response:", data);

                const translatedText = data || "Translation not available";
                console.log("Translated text:", translatedText);
                return translatedText;

            }   catch (error) {
                console.error("There was a problem with the fetch operation:", error);
                throw error;
            }
            
        }

fetchCoffeeButton.addEventListener("click", async() => {
    try {
        const response = await fetch(coffeeURL);
        if (!response.ok) {
            throw new Error("Invalid Request");
        }
        const data = await response.json();
        console.log("Fetched coffee data:", data);
    
 
        //Select new coffee beverage each time button is clicked
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectCoffee = data[randomIndex];

        coffeeContainer.innerHTML = "";

        console.log(data);
        const drinkTitle = selectCoffee.title;
        const drinkName = document.createElement("h2");
        drinkName.innerText = drinkTitle;
        coffeeContainer.appendChild(drinkName);           

        console.log(data);
        const drinkImageUrl = selectCoffee.image;
        const coffeePic = document.createElement("img");
        coffeePic.src = drinkImageUrl;
        coffeeContainer.appendChild(coffeePic);       

        console.log(data);
        const drinkDetails = selectCoffee.description;
        currentDrinkDetails = drinkDetails;       

        const ingredients = document.createElement("h3");
        ingredients.innerText = currentDrinkDetails;
        coffeeContainer.appendChild(ingredients);
       

        fetchTranslationButton.disabled = false;

        console.log("Updated coffeeContainer:", coffeeContainer);

    } catch (err) {
        console.warn(err);
    } 
});

//translate ingredients button
fetchTranslationButton.addEventListener("click", async() => {
    if (!currentDrinkDetails) {
        console.warn("No drink details to translate");
        return;
    }

    try {
        const translatedText = await translate(translateURL, "en", currentDrinkDetails);
        console.log("Translated text:", translatedText);

        const ingredients = coffeeContainer.querySelector("h3");
        if (ingredients) {
            ingredients.innerText = translatedText || "Translation not available";
            console.log("Ingredients element updated with translated text");
    } else {
        console.warn("Ingredients element not found");

    }
        
    console.log("Updated coffeeContainer with translated text:", coffeeContainer);
    } catch (error) {
        console.error("Error translating text:", error);
    }
});
}