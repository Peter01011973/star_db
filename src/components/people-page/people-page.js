import './people-page.css'
import React, {Component} from 'react'
import ItemList from '../item-list/item-list';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';
import ErrorBoundary from '../error-boundary/error-boundary';
import ItemDetails, {Record} from '../item-details/item-details';

export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = { selectedPerson: 5 }

    onPersonSelected = id =>{ this.setState({selectedPerson: id}) }

    render() {
        const { getPerson, getPersonImage } = this.swapiService
        const itemList = (
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPeople}>
      
              {(i) => (
                `${i.name} (${i.birthYear})`
              )}
      
            </ItemList>
          );

        const personDitail = (
            <ItemDetails 
                itemId = {this.state.selectedPerson} 
                getData = {getPerson}
                getImageUrl = {getPersonImage}
            >
                <Record field = {'gender'} label = {'Gender'} />
                <Record field = {'birthYear'} label = {'Birth Year'} />
                <Record field = {'eyeColor'} label = {'Eye Color'} />
            </ItemDetails>
        )

        return (
            <ErrorBoundary>
                <Row 
                    left = {itemList}
                    right = {personDitail}
                />
            </ErrorBoundary>
        )
    }
}