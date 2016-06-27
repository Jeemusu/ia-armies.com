import React from 'react';
import helpers from '../helpers';
import DeploymentCardListItem from './DeploymentCardListItem';

class DeploymentList extends React.Component {

    renderDeploymentCards(key) {

        let card = this.props.deploymentCards[key];

        if(card) {
            return (
                <DeploymentCardListItem {...this.props}
                    setSelectedDeploymentCard={ this.props.setSelectedDeploymentCard.bind(this) }
                    removeFromDeploymentList={ this.props.removeFromDeploymentList.bind(this) } 
                    key={ key } 
                    index={ key } 
                    selected={ this.props.selectedKey == key } 
                    card={ card }　
                    count={ this.props.deploymentList[key] }
                />
            )
        }

        return null;
    }

    render() {

        let count = Object.keys(this.props.deploymentList).length;

        return (
            <div className="scrollable-list">

                { count > 0 ?
                    <ul>{ Object.keys(this.props.deploymentList).map(this.renderDeploymentCards.bind(this)) }</ul> :
                    <p className="army-explain">Click the <span className="add-card">+</span> button on the right side of an item in the list to add it to your army.</p>
                }
            </div>
        )
    }
}

export default DeploymentList;
