import React, {Component} from 'react'
import './item-list.css'
import WithData from '../HOC-helper/HOC-helper';
import SwapiService from '../../services/swapi-service';

const ItemList = (props) => {
    const { data, onItemSelected } = props

    const items = data.map(
        (item) => {
            const snowInfo = props.children(item);
            const { id } = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => { onItemSelected(id) }}>
                    {snowInfo}
                </li>
            )
        }
    )


    return (
        // <div className = 'item-list d-flex jumbotron rounded'>
        <ul className='item-list list-group'>
            {items}
        </ul>
        // </div>
    )
}

const { getAllPeople } = new SwapiService()

export default WithData(ItemList, getAllPeople)