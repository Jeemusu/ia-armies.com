import React from 'react';

class DeploymentCardListItem extends React.Component {

    onSelectCard(event) {
        
        event.preventDefault();

        this.props.setSelectedDeploymentCard(this.props.index);
    }

    onAddClick(event) {

        event.preventDefault();
        
        this.props.addToDeploymentList(this.props.index);
    }

    onRemoveClick(event) {

        event.preventDefault();
        
        this.props.removeFromDeploymentList(this.props.index);
    }

    render() {

        let card = this.props.card;
        let selected = this.props.selected == true ? ' selected' : '';

        return( 
            <li className={ "clearfix" + selected } onClick={ this.onSelectCard.bind(this) }>
                <span className="faction"><img src={ "/images/" + card.faction.toLowerCase() + "-list-icon.png" } /></span>
                <span className={ "type " + card.type }>{ card.cost }</span>
                <span>{ this.props.count && <span className="count"> {this.props.count} x</span> }{ card.name }</span>
                { this.props.addToDeploymentList ? 
                <span className="add-card glyphicon glyphicon-plus" onClick={ this.onAddClick.bind(this) }></span> :
                <span className="remove-card glyphicon glyphicon-remove" onClick={ this.onRemoveClick.bind(this)}></span>
                }
            </li>
        )
    }
}

DeploymentCardListItem.propTypes = {
    selected : React.PropTypes.bool,
    addToDeploymentList : React.PropTypes.func,
    removeFromDeploymentList : React.PropTypes.func,
    setSelectedDeploymentCard : React.PropTypes.func,
    card : React.PropTypes.object.isRequired,
    count : React.PropTypes.number
}

export default DeploymentCardListItem;
