import React, {Component} from 'react'
import './HOC-helper.css'
import Spinner from '../spinner/spinner';

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

const WithData = (View, getItems) => {
    return class extends Component {

    state = {
        data: null       
    }

    onGetItems = data => {this.setState({data})}

    componentDidMount() {
        getItems()
        .then(this.onGetItems)
    }
        
        render() {
            const { data } = this.state
            if (!data) {return <Spinner />}

            return (<View {...this.props} data = {data}/>)
        }
    }
}

export default WithData