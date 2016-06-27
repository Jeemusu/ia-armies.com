import React from 'react';

class SelectedDeploymentCard extends React.Component {

    createSurgeAbilityMarkup() { 

        let card = this.props.card;
        let html = '';
        let i = 0;

        for(let ability in card.surge_abilities) {
            i = i+1;

            // Odd
            if (i%2 != 0) {
                html += '<div class="surge-abilities clearfix">';
            }

            if( card.surge_abilities.length == 3 && i == 3) {
                html += '<div class="long-abilitiy">' + card.surge_abilities[ability] + '</div>';
            } else {
                html += '<div>' + card.surge_abilities[ability] + '</div>';
            }

            if (i%2 == 0) {
                html += '</div>';       
            }

        } 

        return { __html : html }; 
    };

    createAbilityMarkup() { 

        let card = this.props.card;
        let html = '';

        for(let ability in card.abilities) {
            html += '<p>' + card.abilities[ability] + "</p>";       
        }

        return { __html : html }; 
    };


    createDefenceDieMarkup() { 

        let card = this.props.card;
        let html = '';

        for(let die in card.defence) {
            html += '<span class="die ' + card.defence[die] + '"></span>';       
        }

        return { __html : html }; 
    };


    createAttackDieMarkup() { 

        let card = this.props.card;
        let html = '';

        for(let die in card.attack) {
            html += '<span class="die ' + card.attack[die] + '"><i>?</i></span>';       
        }

        return { __html : html }; 
    };

    render() {

        let card = this.props.card;

        return( 
            <div className="card">
                <p className="title">{ card.name }</p>

                { card.trait &&
                    <p className="type">{ card.trait }</p>
                }

                <div className="abilities" dangerouslySetInnerHTML={ this.createSurgeAbilityMarkup() } />
                <div className="descriptions" dangerouslySetInnerHTML={ this.createAbilityMarkup() } />
                <p className="cost">{ card.cost }</p>

                { card.faction &&
                    <span className={ "icon icon-" + card.faction.toLowerCase() }></span>
                }

                { card.weapon &&
                    <span className={ "weapon icon-" + card.weapon.toLowerCase() }></span>
                }

                { card.reinforcements > 0 &&
                    <p className="reinforcements">{ card.reinforcements }</p>
                }
                
                <div className="deployment">
                    <span className="deploy-one"></span>
                    <span className="deploy-two"></span>
                    <span className="deploy-three"></span>
                </div>

                { card.health > 0 &&
                <div className="card-bottom">

                    <div className="card-attribute hp">
                        <span className="attribute-title">Health</span>
                        <span className="attribute-value">{ card.health }</span>
                    </div>

                    <div className="card-attribute speed">
                        <span className="attribute-title">Speed</span>
                        <span className="attribute-value">{ card.speed }</span>
                    </div>

                    <div className="card-attribute defence">
                        <span className="attribute-title">Defence</span>
                        <div className="attribute-dice" dangerouslySetInnerHTML={ this.createDefenceDieMarkup() }/>
                    </div>

                    <div className="card-attribute attack">
                        <span className="attribute-title">Attack</span>
                        <div className="attribute-dice" dangerouslySetInnerHTML={ this.createAttackDieMarkup() } />
                    </div>

                </div>
                }
            </div>
        )
    }
}

SelectedDeploymentCard.propTypes = {
    card : React.PropTypes.object.isRequired
}

export default SelectedDeploymentCard;
