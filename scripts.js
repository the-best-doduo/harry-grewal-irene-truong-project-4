// app holds everything
pokemonApp = {};
const arrayOfChoices = [];

// AJAX call
function getPokemon(number) {
    return $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${number}/`,
        dataType: 'json',
        method: 'GET'
    }).then(function (results) {
        // console.log(results);
        // console.log(results.name);
        // console.log(results.sprites);
        console.log(results.sprites.front_default);
        let sprite = results.sprites.front_default;
        arrayOfChoices.push(results);
        console.log(pokeParty);
        let card = 1;

        for (let count = 0; count <= 6; count++) {
            $(`.card-${card}`).html(`<div>${arrayOfChoices[count].name}<img src = "${arrayOfChoices[count].sprites.front_default}"></div>`);
            card++;
        }

    })
    // this works to append
    //             .then(function(results){
    //                 let sprite = results.sprites.front_default;
    //                 $(`.game-content`).append(`<div>
    //                     <h4>${results.name}</h4>
    //                     <img src="${sprite}">
    //                     </div>`)
    //             })
}

// 6 pokemon to be displayed --> try to randomize later
const pokeParty = [];
for (let i = 1; i <= 6; i++) {
    pokeParty.push(getPokemon(i)
    );
}

// array for each of the index specified above
$.when(...pokeParty)
    .then((...pokeChoices) => {
        arrayOfChoices = pokeChoices.map(pokemon => pokemon[0])
        console.log(arrayOfChoices)

        arrayOfChoices.forEach(pokemonName => console.log(pokemonName.name));
        //still needs work - try to get sprite
        // arrayOfChoices.forEach(pokemonSprite => console.log(pokemonName.name));
        // })

    });


// stores user info into a variable
// prevent default of submit button
// when click submit under same form, stores as variable

// const userInput1 = document.getElementById('guess-1').value;

// console.log(userInput1);



// check if user input matches pokemonName.name
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






// reset button empties .results and removes choices
$(`.reset`).click(function () {
    $(`.results`).empty();
    $(`form`).trigger(`reset`);
    // $(`label`).removeClass('check');
});
// document ready
$(function () {

});