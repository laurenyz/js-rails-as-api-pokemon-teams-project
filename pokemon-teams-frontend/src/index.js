const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    console.log("hello")
    getTrainers()

})

function getTrainers() {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer) {
    let main = document.querySelector('main')
    let card = document.createElement('div')
    let name = document.createElement('p')
    let addBtn = document.createElement('button')
    let pokemonList = document.createElement('ul')
    let pokemonArray = trainer.pokemons 

    card.classList.add('card')
    card.dataset.id = `${trainer.id}`
    name.innerText = trainer.name
    addBtn.innerText = "Add Pokemon"
    addBtn.dataset.id = `${trainer.id}`
    pokemonArray.forEach(pokemon => renderPokemon(pokemon, pokemonList))

    card.append(name, pokemonList, addBtn)
    main.append(card)

}

function renderPokemon(pokemon, pokemonList) {
    let pokemonLi = document.createElement('li')
    pokemonLi.innerText = pokemon.species
    pokemonList.append(pokemonLi)
}
