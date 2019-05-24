// app holds everything
pokemonApp = {};
// const globalArray = [];
// shows array data for 6 random pokemon - needs to be before 

// AJAX call
function getPokemon(number) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${number}/`,
        dataType: 'json',
        method: 'GET'
    })
}

// 6 pokemon to be displayed grabs from the API. calling the function getPokemon the same time we are pushing it --> pokeParty is an array of promises - wait for the data to come back
const pokeParty = [];
// randomPartyArray is the array which will contain the objects for 6 random pokemon
const randomPartyArray = [];
// console.log(pokeParty);
for (let i = 1; i <= 150; i++) {
    pokeParty.push(getPokemon(i)
    );
}
// generate 6 random numbers from 1-150
// ERROR HANDLING - THE SAME NUMBER CAN BE GENERATED MORE THAN ONCE

for (let rando = 1; rando <=6; rando++) {
    const randomParty = Math.floor((Math.random() * pokeParty.length) + 1);
    randomPartyArray.push(randomParty);
}


// console.log(randomPartyArray);
// randomPartyArray.length = 6

// array for each of the index specified above
// ... same as pokeParty[0], pokeParty[1] etc until 6
$.when(...pokeParty)
    // .then((...)) is a parameter that passes a callback function
    .then((...pokeChoices) => {
        // go through pokeChoices and grab the first item[0] of each of the objects
        const arrayOfChoices = pokeChoices.map(pokemon => pokemon[0]);
        // let globalArray = arrayOfChoices;
        // console.log(arrayOfChoices);
        // console.log(globalArray);
        // Associated random number with the object in arrayOfChoices
        let card = 1;
        for (let n = 0; n <= randomPartyArray.length; n++) {
            // console.log(arrayOfChoices[randomPartyArray[n]].name);
            // this yields card-1 to get position of each card bc before, defined let card= a number so ${card} now yields a number
            $(`.card-${card}`).html(`<div>
            <img src = "${arrayOfChoices[randomPartyArray[n]].sprites.front_default}" alt="Pokemon card.">
            <p>${arrayOfChoices[randomPartyArray[n]].name}</p>
            </div>`);
            $(`.card-${card} + form .fieldset`).prepend(`<input type="hidden" value="${arrayOfChoices[randomPartyArray[n]].name}">`);
            card++;
        }
// aware of n so can go through each pokemon and check if matches any of the,
        
        

                // if (userGuess === `${arrayOfChoices[randomPartyArray[n]].name}`) {
                //     console.log("correct!")
                // } else {
                //     console.log("wrong!")
                // }

                // const userInput1 = document.getElementById('guess-1').value;
                // console.log(userInput1);

                // const userInput2 = document.getElementById('guess-2').value;
                // console.log(userInput2);

                // const userInput3 = document.getElementById('guess-3').value;
                // console.log(userInput3);

                // const userInput4 = document.getElementById('guess-4').value;
                // console.log(userInput4);

                // const userInput5 = document.getElementById('guess-5').value;
                // console.log(userInput5);

                // const userInput6 = document.getElementById('guess-6').value;
                // console.log(userInput6);

        

        // for (let count = 0; count <= 6; count++) {

        // }
    });

        // TO GET 150 and randomize: make a call for 150 and have a giant array of info, then create a function to randomize and grab 6

    // array for each of the index specified above. .when listens to multiple promises and then tells you when the 





// stores user input into variable once they click submit


// FUNCTION: check if user input matches pokemonName.name



// FUNCTION: when pass, reveal pokemon name
$(`.pass`).on(`click`, function (e) {
    e.preventDefault();
    console.log("pressed");
    // $(`.card-1 p`).addClass(`card-reveal`);
    // this targets all paragraphs - need to show one at a time if user presses PASS - maybe use addClass of .card-reveal in game.scss
    $(`p`).show(`slow`);
});


// reset button empties .results and removes choices
$(`.reset`).click(function () {
    $(`.results`).empty();
    $(`form`).trigger(`reset`);
});
// document ready
$(function () {

});

// $(`#form-1`).on('submit', function(e) {
//     e.preventDefault();
//     console.log("safi");
// })

$(`form`).on(`submit`, function (e) {
            
            e.preventDefault();
            console.log("harry");
            // const that = $(this).find('input');
            
            // try to run this in a for loop with same logic as abv by let userInput=1

            let userInput = 1;
                // for (let inputNumber = 0; inputNumber < 6; inputNumber++) {
                    // need to define 6 userGuess's - how do we store them all in seperate 6 varaibles so we can if/else them later?
                    let userGuess = $(this).find('input[type="text"]').val();
                    let correctAnswer = $(this).find('input[type="hidden"]').val();
                    console.log(userGuess);
                    console.log(correctAnswer);
                    if (userGuess === correctAnswer) {
                        console.log("correct");
                    } else {
                        console.log("incorrect");
                    }
                    

                    // Checks to see if the userGuess matches the name of the pokemon, then clears userGuess for the next check
                    // Not working because we use vanilla javascript to get userGuess, but .empty is a jquery function
                    // Possibly take this out ?

                    // userInput ++;

                    // that.val('');
                // }


        })
// ERROR HANDLING - SOMETIMES NOT ALL POKEMON LOAD ONTO SCREEN