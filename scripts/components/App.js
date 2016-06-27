import React from 'react';
import Catalyst from 'react-catalyst';
import Header from './Header';
import DeploymentBuilder from './DeploymentBuilder';
import reactMixin from 'react-mixin';
import {Tabs, Tab} from './Tabs';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://ia-armies.firebaseio.com');

class App extends React.Component {

    constructor() {

        super();

        this.state = {
            deploymentCards : {},
            deploymentList : {},
            commandCards : {},
            commandList : {}
        }
    }

    componentDidMount() {

        // Get deployment card data from firebase and add to state
        base.syncState('/deploymentCards', {
            context : this,
            state : 'deploymentCards',
            queries: {
                orderByChild: 'id'
            }
        });

        // Get deployment list from local storage
        let localStorageRef = localStorage.getItem('deploymentList');

        // Add deployment list to state
        if(localStorageRef) {
            this.setState({
                deploymentList : JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {

        localStorage.setItem('deploymentList', JSON.stringify(nextState.deploymentList));
    }

    addToDeploymentList(key) {

        this.state.deploymentList[key] = this.state.deploymentList[key] + 1 || 1;
        this.setState({ deploymentList : this.state.deploymentList });
    }

    removeFromDeploymentList(key) {

        this.state.deploymentList[key] = this.state.deploymentList[key] - 1;
        if(this.state.deploymentList[key] <= 0 ) {
            delete this.state.deploymentList[key];
        }

        this.setState({ 
            deploymentList : this.state.deploymentList 
        });
    }



    render() {

        let deploymentCardIds = Object.keys(this.state.deploymentList);

        let total = deploymentCardIds.reduce((prevTotal, key) => {

            let card = this.state.deploymentCards[key];
            let count = this.state.deploymentList[key];

            if(card) {
                return prevTotal + (count * parseInt(card.cost) || 0);
            }

            return prevTotal;
        }, 0);

        if(this.state.deploymentCards.length > 0) {

            return (
                <div>
                    <Header />
                    <div className="row content-block">
                        <div className="container">
                            <Tabs className="tabs-wrapper">
                                <Tab active={true} title="Deployment Cards" id="deploymentCards" className="clearfix">
                                    <DeploymentBuilder 
                                        addToDeploymentList={ this.addToDeploymentList.bind(this) } 
                                        deploymentCards={this.state.deploymentCards} 
                                        deploymentList={ this.state.deploymentList } 
                                        removeFromDeploymentList={ this.removeFromDeploymentList.bind(this) }
                                    />
                                </Tab>
                                
                                <Tab title="Command Cards" id="commandCards" className="clearfix">
                                    <div className="col-xs-4 cards">

                                        <h2>Command Cards</h2>

                                        <div className="scrollable-list">
                                            <ul>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-md-4 details clearfix">
                                        <h3 id="commandPoints">0<span>Command Points</span></h3>
                                        <h3 id="commandLimit"><sup class="value">0</sup>/<sub>15</sub><span class="sub-text">Cards</span></h3>
                                    </div>

                                    <div className="col-md-4 player-hand">
                                        <h2>Player Deck</h2>

                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin)

export default App;