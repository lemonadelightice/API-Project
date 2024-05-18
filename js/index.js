const coffeeContainer = document.getElementById("coffeeContainer");
const fetchCoffeeButton = document.getElementById("fetch-coffee");

fetchCoffeeButton.addEventListener("click", () =>{

    fetch("https://api.sampleapis.com/coffee/hot")
    .then((res) => {
        console.log(res);
        if (!res.ok) {
            throw new Error("Invalid Request");
        }
        return res.json();
    })
    .then((data) => {
        //Select new coffee beverage each time button is clicked
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectCoffee = data[randomIndex];

        console.log(data);
        const drinkTitle = selectCoffee.title;
        const drinkName = document.createElement("h2");
        drinkName.innerText = drinkTitle;
        coffeeContainer.appendChild(drinkName);

        console.log(data);
        const drinkDetails = selectCoffee.description;
        const ingredients = document.createElement("h3");
        ingredients.innerText = drinkDetails;
        

        console.log(data);
        const drinkImageUrl = selectCoffee.image;
        const coffeePic = document.createElement("img");
        coffeePic.src = drinkImageUrl;
        coffeeContainer.appendChild(coffeePic);
        coffeeContainer.appendChild(ingredients);
        
    }).catch((err) => {
        console.warn(err);
    });

})

console.log(coffeeContainer);

