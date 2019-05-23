// app holds everything
pokemonApp = {};
// shows array data for 6 random pokemon - needs to be before AJAX call to store
const arrayOfChoices = [];

// AJAX call
function getPokemon(number) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${number}/`,
        dataType: 'json',
        method: 'GET'
    })
    // .then(function (results) {
    //     console.log(results);
    //     // console.log(results.name);
    //     // console.log(results.sprites);

    //     // to show sprite
    //     let sprite = results.sprites.front_default;

    //     // getting all results for the 6 randomized pokemon and pushing into arrayOfChoices
    //     arrayOfChoices.push(results);
        
    //     // to reference the first card div in our HTML
    //     let card = 1;

    //      // this grabs the first 6 pokemon. varaible count references the position in the array so name/sprite index matches
    //     for (let count = 0; count <= 6; count++) {
    //         $(`.card-${card}`).html(`<div>${arrayOfChoices[count].name}<img src = "${arrayOfChoices[count].sprites.front_default}"></div>`);
    //         card++;
    //     }

    // })
}

// 6 pokemon to be displayed grabs from the API. calling the function getPokemon the same time we are pushing it --> try to randomize later - pokeParty is an array of promises - wait for the data to come back
const pokeParty = [];
console.log(pokeParty);
for (let i = 1; i <= 6; i++) {
    pokeParty.push(getPokemon(i)
    );
}

// array for each of the index specified above
// ... same as pokeParty[0], pokeParty[1] etc until 6
$.when(...pokeParty)
    // .then((...)) is a parameter that passes a callback function
    .then((...pokeChoices) => {
        // go through pokeChoices and grab the first item[0] of each of the objects
        arrayOfChoices = pokeChoices.map(pokemon => pokemon[0]);
        console.log(arrayOfChoices)

        // for each array, create a variable to allow to pop up in the DOM
        arrayOfChoices.forEach(pokemonData => console.log(pokemonData.name));
    });
        //still needs work - try to get sprite
        // arrayOfChoices.forEach(pokemonSprite => console.log(pokemonName.name));
        // })

        // TO GET 150 and randomize: make a call for 150 and have a giant array of info, then create a function to randomize and grab 6

    // array for each of the index specified above. .when listens to multiple promises and then tells you when the 


        // for each array, create a variable to allow to pop up in the DOM
        arrayOfChoices.forEach(pokemonData => console.log(pokemonData.name));
    });


// stores user input into variable once they click submit
$(`form`).on(`submit`, function (e) {
    e.preventDefault();
    // try to run this in a for loop
    const userInput1 = document.getElementById('guess-1').value;
    console.log(userInput1);

    const userInput2 = document.getElementById('guess-2').value;
    console.log(userInput2);

    const userInput3 = document.getElementById('guess-3').value;
    console.log(userInput3);

    const userInput4 = document.getElementById('guess-4').value;
    console.log(userInput4);

    const userInput5 = document.getElementById('guess-5').value;
    console.log(userInput5);

    const userInput6 = document.getElementById('guess-6').value;
    console.log(userInput6);

})

// check if user input matches pokemonName.name





// reset button empties .results and removes choices
$(`.reset`).click(function () {
    $(`.results`).empty();
    $(`form`).trigger(`reset`);
    // $(`label`).removeClass('check');
});
// document ready
$(function () {

});