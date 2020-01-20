import './item-details.css'
import React, {Component} from 'react'
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorButton from '../error-button/error-button';

const Record = ({field, label, item}) => {
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Record}

export default class ItemDetails extends Component {
    state = {
       item: null, 
       loading: false,
       image: null
    }

    swapiService = new SwapiService();

    itemUpdate() {
        this.setState({loading: true});
        const { itemId, getData, getImageUrl } = this.props;
        if ( !itemId ) { return }
        getData(itemId)
        .then(item => {
            this.setState(
                {
                    item, 
                    loading: false,
                    image: getImageUrl(item)
                }
            )
        })
    }

    componentDidMount() {
        this.itemUpdate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId !== this.props.itemId) {
            this.itemUpdate();
        }
    }

    render() {
        if (!this.state.item) {return <Spinner />}
        const { item, image} = this.state;     

        return (
            <div className="item-details card d-flex">

                <img
                    className="item-image"
                    src={image}
                    alt='item'
                />

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        )
    }
}



