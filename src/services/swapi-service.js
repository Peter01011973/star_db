
export default class SwapiService {
    _apiBase = `https://swapi.co/api`;
    _apiImageBase = `https://starwars-visualguide.com/assets/img`;

    getResourse = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}. Response is ${response.status}`)
        }
        const data = await response.json();
        return data
    }

    getAllPeople = async () => {
        const rez = await this.getResourse(`/people/`)
        return rez.results.map(this._transformPerson)        
    }

    getAllPlanets = async () => {
        const rez = await this.getResourse(`/planets/`)
        return rez.results.map(this._transformPlanet)        
    }

    getAllStarships = async () => {
        const rez = await this.getResourse(`/starships/`)
        return rez.results.map(this._transformStarship)      
    }

    getPerson = async (id) => {
        const person = await this.getResourse(`/people/${id}/`) 
        return this._transformPerson(person)     
    }

    getPlanet = async (id) => {
        const planet = await this.getResourse(`/planets/${id}/`)
        return this._transformPlanet(planet)
    }

    getStarship = async (id) => {
        const starship = await this.getResourse(`/starships/${id}/`) 
        return this._transformStarship(starship)
    }

    _transformStarship = (starship) => {
        return {
          id: this._extractId(starship.url),
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          costInCredits: starship.costInCredits,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cargoCapacity: starship.cargoCapacity
        }
    }

    _transformPerson = (person) => {
        const id = this._extractId(person.url);
        return {
            id,
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color
        }        
    }

    _transformPlanet = (planet) => {
        const id = this._extractId(planet.url);
        return {
            id,
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.match(idRegExp)[1];     
    }

    getPersonImage = ({id}) => {
        return `${this._apiImageBase}/characters/${id}.jpg`
    }   
    
    getStarshipImage = ({id}) => {
        return `${this._apiImageBase}/starships/${id}.jpg`
    }  

    getPlanetImage = ({id}) => {
        return `${this._apiImageBase}/planets/${id}.jpg`
    }  

}


