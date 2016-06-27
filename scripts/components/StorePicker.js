import React from 'react';
import { History } from 'react-router';
import helpers from '../helpers';
import reactMixin from 'react-mixin';

class StorePicker extends React.Component {

    goToStore(event) {

        event.preventDefault();
        let storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId);
    }

    render() {

        return (
            <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
                <h2>Please Enter A Store</h2>
                <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
                <input type="Submit" />                
            </form>
        )
    }
}

reactMixin.onClass(StorePicker, History)

export default StorePicker;