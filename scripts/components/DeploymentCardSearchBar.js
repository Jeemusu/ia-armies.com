import React from 'react';

class DeploymentCardSearchBar extends React.Component {

    handleOnChange() {

        var query = this.refs.queryFilter.value.toLowerCase();
        var faction = this.refs.factionFilter.value.toLowerCase();
        var trait = this.refs.traitFilter.value.toLowerCase();

        this.props.filterDeploymentCards(query, faction, trait);
    }

    render() {

        return (
            <form className="search-bar">
                <div className="row">
                    <div className="col-xs-5">
                        <input className="form-control input-sm" ref="queryFilter" type="text" placeholder="Search..." onChange={ this.handleOnChange.bind(this) } />
                    </div>
                    <div className="col-xs-3">
                        <select className="form-control input-sm" ref="factionFilter" onChange={ this.handleOnChange.bind(this) }>
                            <option value="">Faction</option>
                            <option value="">All</option>
                            <option value="imperial">Imperial</option>
                            <option value="mercenary">Mercenary</option>
                            <option value="rebel">Rebel</option>
                        </select>
                    </div>
                    <div className="col-xs-4 input-pad-r">
                        <select className="form-control input-sm" ref="traitFilter" onChange={ this.handleOnChange.bind(this) }>
                            <option value="">Trait</option>
                            <option value="">All</option>
                            <option value="force user">Force User</option>
                            <option value="brawler">Brawler</option>
                        </select>
                    </div>
                </div>
            </form>
        )
    }
}

DeploymentCardSearchBar.propTypes = {
    filterDeploymentCards : React.PropTypes.func.isRequired
}

export default DeploymentCardSearchBar;
