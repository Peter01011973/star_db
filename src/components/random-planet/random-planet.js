import './random-planet.css'
import React, {Component} from 'react'
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';



export default class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false        
    }

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet,50000);
    }

    componentWillUnmount() {
        // console.log('componentWillUnmount()');
        clearInterval(this.interval);   
    }

    onPlanetLoaded = (planet) => this.setState({planet, loading: false}) 

    onError = () => {this.setState({loading: false, error: true})}

    updatePlanet = () => {
        
        const id = Math.floor(Math.random()*24)+3;
        // const id = 1200;    
        this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError)
    }

    render() {
        // console.log('render()');
        
        const {planet, loading, error} = this.state;
        const spinner = loading ? <Spinner /> : null
        const content = !loading && !error ? <RenderPlanet planet = {planet}/> : null
        const errorRender = error ? <ErrorIndicator /> : null

        return (
            <div className = 'random-planet d-flex jumbotron rounded'>
                {spinner}
                {errorRender}
                {content}
            </div>
        )
    }
}

const RenderPlanet = ({planet}) => {
    const {id, name, diameter, rotationPeriod, population} = planet
    
    return (
        <React.Fragment>
            <img className='planet-image' src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='planet'/>
            <div>
                <h4>{name}</h4>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className='list-group-item'>
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className='list-group-item'>
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}