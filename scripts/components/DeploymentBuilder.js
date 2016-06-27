import React from 'react';
import DeploymentList from './DeploymentList';
import SelectedDeploymentCard from './SelectedDeploymentCard';
import DeploymentCardSearchBar from './DeploymentCardSearchBar';
import DeploymentCardListItem from './DeploymentCardListItem';

class DeploymentBuilder extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            selectedDeploymentCardKey : 0,
            selectedDeploymentCard : {},
            selectedDeploymentListCardKey : 0,
            filteredDeploymentCards : []
        }; 
    }

    componentDidMount() {

        this.setState({
            filteredDeploymentCards : Object.keys(this.props.deploymentCards),
            selectedDeploymentCard : this.props.deploymentCards[0]
        });
    }

    setSelectedDeploymentCard(key) {

        this.setState({ 
            selectedDeploymentCardKey : parseInt(key),
            selectedDeploymentCard : this.props.deploymentCards[key]
        });
    }

    setSelectedDeploymentListCard(key) {

        this.setState({ 
            selectedDeploymentListCardKey : parseInt(key),
            selectedDeploymentCard : this.props.deploymentCards[key]
        });
    }

    renderDeploymentCards(key) {
        let filteredKey = this.state.filteredDeploymentCards[key];

        return (
            <DeploymentCardListItem 
                addToDeploymentList={ this.props.addToDeploymentList.bind(this) } 
                key={ filteredKey } 
                index={ filteredKey } 
                selected={ this.state.selectedDeploymentCardKey == filteredKey } 
                setSelectedDeploymentCard={ this.setSelectedDeploymentCard.bind(this) }
                card={ this.props.deploymentCards[filteredKey] }
            />
        )
    }

    filterDeploymentCards(query, faction, trait) {
        let filtered = [];

        this.props.deploymentCards.filter(function (card, index, array) {
            if( card.name.toLowerCase().indexOf(query) >= 0 && card.trait.toLowerCase().indexOf(trait) >= 0 && card.faction.toLowerCase().indexOf(faction) >= 0) {
                filtered.push(index);
                return true;
            }
        });

        this.setState({ 
            filteredDeploymentCards : filtered 
        });
    }

    render() {

        let deploymentCardIds = Object.keys(this.props.deploymentList);

        let total = deploymentCardIds.reduce((prevTotal, key) => {

            let card = this.props.deploymentCards[key];
            let count = this.props.deploymentList[key];

            if(card) {
                return prevTotal + (count * parseInt(card.cost) || 0);
            }

            return prevTotal;
        }, 0);

        return(
            <div>
                <div className="col-xs-4 cards">

                    <h2>Deployment Cards</h2>

                    <DeploymentCardSearchBar filterDeploymentCards={ this.filterDeploymentCards.bind(this) } />

                    <div className="scrollable-list">
                        <ul>
                            { Object.keys(this.state.filteredDeploymentCards).map(this.renderDeploymentCards.bind(this)) }
                        </ul>
                    </div>
                </div>

                <div className="col-md-4 details">
                    <h3>{ total }<span>Deployment Points</span></h3>

                    <SelectedDeploymentCard card={ this.state.selectedDeploymentCard } />
                </div>

                <div className="col-md-4 player-hand">
                    <h2>Player Deck</h2>

                    <DeploymentList 
                        selectedKey={ this.state.selectedDeploymentListCardKey } 
                        setSelectedDeploymentCard={ this.setSelectedDeploymentListCard.bind(this) } 
                        removeFromDeploymentList={ this.props.removeFromDeploymentList.bind(this) } 
                        deploymentCards={ this.props.deploymentCards } 
                        deploymentList={ this.props.deploymentList } 
                    />
                </div>
            </div>
        )
    }
}

export default DeploymentBuilder;
