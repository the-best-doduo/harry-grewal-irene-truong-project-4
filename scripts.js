// app holds everything
pokemonApp = {};
// defining score as global variable
pokemonApp.score = 0;
// 6 pokemon to be displayed grabs from the API. calling the function getPokemon the same time we are pushing it --> pokeParty is an array of promises - wait for the data to come back
pokemonApp.pokeParty = [];
// randomPartyArray is the array which will contain the objects for 6 random pokemon
pokemonApp.randomPartyArray = [];

// AJAX call
pokemonApp.getPokemon = function(number) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${number}/`,
        dataType: 'json',
        method: 'GET'
    })
};

pokemonApp.initPokedex = function() {
    for (let i = 1; i <= 150; i++) {
        pokemonApp.pokeParty.push(pokemonApp.getPokemon(i)
        );
    }

    // generate 6 random numbers from 1-150
    for (let rando = 1; rando <= 6; rando++) {
        const randomParty = Math.floor((Math.random() * pokemonApp.pokeParty.length) + 1);
        pokemonApp.randomPartyArray.push(randomParty);
    }
    // array for each of the index specified above
    // ... same as pokeParty[0], pokeParty[1] etc until 6
    // .then((...)) is a parameter that passes a callback function
    $.when(...pokemonApp.pokeParty).then((...pokeChoices) => {
        // go through pokeChoices and grab the first item[0] of each of the objects
        const arrayOfChoices = pokeChoices.map(pokemon => pokemon[0]);
        let card = 1;
        for (let n = 0; n <= pokemonApp.randomPartyArray.length; n++) {
            // this yields card-1 to get position of each card bc before, defined let card= a number so ${card} now yields a number
            $(`.card-${card}`).html(`<div>
            <img src = "${arrayOfChoices[pokemonApp.randomPartyArray[n]].sprites.front_default}" alt="Pokemon card." class="filter-on">
            <p><span class = "correct-answer">${arrayOfChoices[pokemonApp.randomPartyArray[n]].name}</span> </p>
            </div>`);

            $(`.card-${card} + form .fieldset`).prepend(`<input type="hidden" value="${arrayOfChoices[pokemonApp.randomPartyArray[n]].name}">`);
            // the above prepends input hidden of the value of the generated pokemon name
            card++;
        }
        // TO GET 150 and randomize: make a call for 150 and have a giant array of info, then create a function to randomize and grab 6
    });
}

// stores user input into variable once they click submit
// FUNCTION: check if user input matches pokemonName.name
pokemonApp.initSubmission = () => {
    $(`form`).on(`submit`, function (e) {    
        e.preventDefault();
        let userInput = 1;
        // stores in variable value that the user passes in input text from html, and also stores in variable the input hidden (pokemon name) that was dynamically added to the DOM
        // The value the user inputted is automatically converted to lower case to prevent capitalization errors
        let userGuess = $(this).find('input[type="text"]').val().toLowerCase();
        let correctAnswer = $(this).find('input[type="hidden"]').val();

        // checks if userGuess is correct or not
        if (userGuess === correctAnswer) {
            $(this).prepend(`<p class = "answer-statement">Correct!</p>`);
            $(this).parent().find('.raptor').addClass('completed');
            pokemonApp.score = pokemonApp.score + 1;
        } else {     
            $(this).prepend(`<p class='answer-statement'>The correct answer is <span class ="correct-answer">${correctAnswer}</span></p>`);
            $(this).parent().find('.raptor').addClass('completed');
        }
        // After determining whether the user's input was correct or incorrect, the chosen card's input text field, submit button, and pass button are all disabled
        $(this).find(`input[type="text"]`).prop("disabled", true);
        $(this).find(`input[type="submit"]`).prop("disabled", true).css({ "background": "rgb(218,218,218)", "color":"rgb(152,132,127)" });
        // the above adds css styling to submit when user clicks submit. below adds styling to pass to prevent hover effect
        $(this).find(`button[class="pass"]`).prop("disabled", true).css({ "background": "rgba(50,98,153,0.9)", "color":"rgb(152,132,127)"});
        // Removes the class that blacks out the pokemon
        $(this).parent().find(`img`).removeClass("filter-on");
    });
};

// FUNCTION: when click pass, reveal pokemon name
pokemonApp.initPass = () => {
    $(`.pass`).on(`click`, function (e) {
        e.preventDefault();
    // store as variable the target's attribute at position 1
        const num = e.target.attributes[1].value
        // After clicking pass, disables the input text field, submit button, and pass button of the selected card
        $(this).css({ "background": "rgb(218,218,218)", "color": "rgb(152,132,127)" });
        // the above adds css styling to pass when user clicks pass
        $(this).parent().parent().find(`input[type="text"]`).prop("disabled", true);
        $(this).parent().find(`input[type="submit"]`).prop("disabled", true).css({ "background": "rgba(50,98,153,0.9)", "color": "rgb(152,132,127)" });
        // the above adds styling to submit after pass is clicked
        $(this).prop("disabled", true);
        $(this).parent().parent().parent().parent().find(`img`).removeClass("filter-on");

    // for each pass button click per card, change css style to display the p
        $(`.card-${num} p`).append(` is the correct answer`).css({ "display": "block" })
    });
};

// FUNCTION: final submit button shows score
pokemonApp.initSecondSubmission = () => {
    $(`.submit`).on(`click`, function(e){
        e.preventDefault();
        
    // FUNCTION IF NOT ALL FIELDS ARE FULL
        // When user clicks final submit button, all the input fields, submit buttons and pass buttons are disabled for all cards. This ensures the user can't submit without answering, and then add in answers to change their score
        $(this).parent().parent().find(`input[type="text"]`).prop("disabled", true);
        $(this).parent().parent().find(`input[type="submit"]`).prop("disabled", true).css({ "background": "rgba(50,98,153,0.9)", "color": "rgb(152,132,127)" });
        $(this).parent().parent().find(`button[class="pass"]`).prop("disabled", true).css({ "background": "rgba(50,98,153,0.9)", "color": "rgb(152,132,127)" });
        
        // Disables the final submit as well to match the color scheme of all disabled buttons
        $(this).prop("disabled", true).css({ "background": "rgba(50,98,153,0.9)", "color": "rgb(152,132,127)" });

        $(this).parent().parent().find(`img`).removeClass("filter-on");

        // Printing out the statement with the pokemon name when the user leaves a card blank
        for (let i=1; i < 7; i ++) {
            if (!($(`.card-${i}`).hasClass('completed'))) {
                $(`.card-${i}`).find(`p`).css({ "display": "block" });
            }
        }

        // Prints out the final score 
        $(`.results`).html(`<div><h2>Your final score is ${pokemonApp.score} out of 6!</h2></div>`)
    });
};

// reset button reloads page to new game
pokemonApp.initReset = function() {
    $(`.reset`).click(function () {
        $(`form`).trigger(`reset`);
        location.reload();
    });
};

pokemonApp.init = function () {
    pokemonApp.getPokemon();
    pokemonApp.initPokedex();
    pokemonApp.initSubmission();
    pokemonApp.initPass();
    pokemonApp.initSecondSubmission();
    pokemonApp.initReset();
};

// DOCUMENT READY
$(function () {
   pokemonApp.init();
});