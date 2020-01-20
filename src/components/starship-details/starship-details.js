import './starship-details.css'
import React, {Component} from 'react'
import SwapiService from '../../services/swapi-service'

export default class StarshipDitails extends Component {
    swapiService = new SwapiService();

    state = {
        starship: {}
    }

    constructor() {
        super()
    }

    // updatePlanet() {
    //     const id = Math.floor(Math.random()*24)+2;    
    //     this.swapiService
    //     .getPlanet(id)
    //     .then((planet) => this.setState({planet}))
    // }

    render() {

        // const {starship :{id, name, diameter, rotationPeriod, population}} = this.state;
           
        return (
            <div className = 'starship-details d-flex jumbotron rounded'>
                <img className='planet-image' src = {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
                <div>
                    <h4>{name}</h4>
                    <ul className='list-group list-group-flush'>
                        <li className = 'list-group-item'>
                            <span className="term">Population</span>
                            <span>{population}</span>
                        </li>
                        <li className = 'list-group-item'>
                            <span className="term">Rotation Period</span>
                            <span>{rotationPeriod}</span>
                        </li>
                        <li className = 'list-group-item'>
                            <span className="term">Diameter</span>
                            <span>{diameter}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}