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

// defining score as global variable
let score = 0;



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
        let card = 1;
        for (let n = 0; n <= randomPartyArray.length; n++) {
            // console.log(arrayOfChoices[randomPartyArray[n]].name);
            // this yields card-1 to get position of each card bc before, defined let card= a number so ${card} now yields a number
            $(`.card-${card}`).html(`<div>
            <img src = "${arrayOfChoices[randomPartyArray[n]].sprites.front_default}" alt="Pokemon card.">
            <p>${arrayOfChoices[randomPartyArray[n]].name}</p>
            </div>`);

            $(`.card-${card} + form .fieldset`).prepend(`<input type="hidden" value="${arrayOfChoices[randomPartyArray[n]].name}">`);
            // the above prepends input hidden of the value of the generated pokemon name
            card++;
        }
    });

        // TO GET 150 and randomize: make a call for 150 and have a giant array of info, then create a function to randomize and grab 6

// stores user input into variable once they click submit
// FUNCTION: check if user input matches pokemonName.name
$(`form`).on(`submit`, function (e) {    
    e.preventDefault();
    let userInput = 1;

    // stores in variable value that the user passes in input text from html, and also stores in variable the input hidden (pokemon name) that was dynamically added to the DOM
    let userGuess = $(this).find('input[type="text"]').val();
    let correctAnswer = $(this).find('input[type="hidden"]').val();
    console.log(userGuess);
    console.log(correctAnswer);

    // checks if userGuess is correct or not
    if (userGuess === correctAnswer) {
        console.log("correct");
        $(this).prepend(`<p>Correct!</p>`);
        score = score + 1;
    } else {     
        console.log("incorrect");
        $(this).prepend(`<p>Incorrect! The correct answer is <span>${correctAnswer}</span></p>`)
        
    }
})


// ERROR HANDLING - SOMETIMES NOT ALL POKEMON LOAD ONTO SCREEN

// FUNCTION: when click pass, reveal pokemon name
$(`.pass`).on(`click`, function (e) {
    e.preventDefault();
// store as variable the target's attribute at position 1
    const num = e.target.attributes[1].value

// for each pass button click per card, change css style to display the p
    // This works
    // $(`.card-${num} p`).css({"display": "block"})
// NEED TO PUT 'IS THE CORRECT ANSWER' IN A P or SPAN
    $(`.card-${num} p`).append(` is the correct answer.`).css({ "display": "block" })


    // $(`.card-${num} p`).addClass(`card-reveal`)
});




// FUNCTION: final submit button shows score. This may be already connected to the above when factoring in submit functionality
$(`.submit`).on(`click`, function(e){
    e.preventDefault();
    $(`.results`).html(`<div>Your final score is ${score}!</div>`)
})


// reset button reloads page to new game
$(`.reset`).click(function () {
    location.reload();
});
// document ready
$(function () {
   
});