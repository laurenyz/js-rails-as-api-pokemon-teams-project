class PokemonsController < ApplicationController
    require 'faker'
    
    def index 
        pokemons = Pokemon.all 
        render json: pokemons 
    end 

    def create 
        trainer_id = params['trainer_id']
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        newPokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
        render json: newPokemon 
    end 

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end

end
