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
    addBtn.dataset.trainerId = `${trainer.id}`
    addBtn.addEventListener("click", addPokemon)
    pokemonArray.forEach(pokemon => renderPokemon(pokemon, pokemonList))

    card.append(name, addBtn, pokemonList)
    main.append(card)

}

function renderPokemon(pokemon, pokemonList) {
    let pokemonLi = document.createElement('li')
    let releaseBtn = document.createElement('button')
    
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    releaseBtn.innerText = "Release"
    releaseBtn.classList.add("release")
    releaseBtn.dataset.pokemonId = pokemon.id
    releaseBtn.addEventListener("click", deletePokemon)

    pokemonLi.append(releaseBtn)
    
    if (pokemonList.children.length < 6) {
        pokemonList.append(pokemonLi)
    } else {
        alert("Your team is full")
    }
    
}
function addPokemon(event) {
    let card = event.target.parentElement
    let pokemonList = card.querySelector('ul')
    payload = {"trainer_id": event.target.dataset.trainerId}
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }).then(resp => resp.json()).then(
        newPokemon => renderPokemon(newPokemon, pokemonList)
    )
}

function deletePokemon(event) {
    let pokemonId = event.target.dataset.pokemonId
    let pokemonLi = event.target.parentElement

    fetch(`${POKEMONS_URL}/${pokemonId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })

    pokemonLi.remove()

}