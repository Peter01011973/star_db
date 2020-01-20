import React, {Component} from 'react';
import './app.css';
import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorBoundary from '../error-boundary/error-boundary';
import Row from '../row/row';
import ItemDetails, {Record} from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';
import PeoplePage from '../people-page/people-page'

export default class App extends Component {
    swapiService = new SwapiService()
    state = {
        renderRandomPlanet: true
    }

    toggleRandomPlanetHandler = () => {this.setState(state =>{return {renderRandomPlanet: !state.renderRandomPlanet}})}

    render() {
        const { getPerson, getPersonImage, getStarshipImage } = this.swapiService
        const randomPlanet = this.state.renderRandomPlanet ? <RandomPlanet /> : null
        
        const personDetails = (
            <ItemDetails 
                itemId = {12} 
                getData = {getPerson}
                getImageUrl = {getPersonImage}
            >
                <Record field = {'gender'} label = {'Gender'} />
                <Record field = {'birthYear'} label = {'Birth Year'} />
                <Record field = {'eyeColor'} label = {'Eye Color'} />
            </ItemDetails>
        )

        const starshipDetails = (
            <ItemDetails 
                itemId = {10} 
                getData = {this.swapiService.getStarship}
                getImageUrl = {getStarshipImage}
            >
                <Record field = {'model'} label = {'Model'}/>
                <Record field = {'manufacturer'} label = {'Manufacturer'}/>
                <Record field = {'length'} label = {'Length'}/>
                <Record field = {'crew'} label = {'Crew'}/>
                <Record field = {'passengers'} label = {'Passengers'}/>
                <Record field = {'cargoCapacity'} label = {'Cargo Capacity'}/>
            </ ItemDetails>
        )

        return (
            <ErrorBoundary>
                <div className = 'container'>
                    <Header />
                    {randomPlanet}
                    {/* <button 
                        className='btn btn-warning' 
                        onClick = {this.toggleRandomPlanetHandler}
                    >Toggle random planet</button>
                    <ErrorButton /> */}
                    <Row left = {personDetails} right = {starshipDetails} />
                    <PeoplePage />
                </div>
            </ErrorBoundary>
        )
    }
}
