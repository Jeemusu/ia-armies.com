import React from 'react';

class Tabs extends React.Component {

    constructor() {
 
        super();

        this.state = {
            activeIndex: 0
        };
    }

    componentDidMount() {

        this.setState({
            activeIndex: this.getActiveIndex()
        });
    }

    getActiveIndex() {

        let index = 0;
        let activeIndex = React.Children.map(this.props.children, function (child) {
            if (child.props.active === true) {
                return index;
            }

            index++;
        });

        return activeIndex;
    }

    handleOnClick(key, event) {

        event.preventDefault();

        this.setActiveIndex(key);
    }

    setActiveIndex(key) {

        this.setState({
            activeIndex: key
        });
    }

    renderNavItem(key) {

        let tab = this.props.children[key];
        let id = tab.props.id ? tab.props.id : '';
        
        return (
            <li key={ key } className={ this.state.activeIndex == key ? 'active' : ''}>
                <a href={ "#" + id } onClick={ this.handleOnClick.bind(this, key) }>{ tab.props.title }</a>
            </li>
        );
    }

    getTab(key) {

        let index = 0;
        let active = this.state.activeIndex;
        
        let tabs = React.Children.map(this.props.children, function (child) {

            let children = React.cloneElement(child, {
                active : active == index ? true : false
            });

            index++;
            return children;
        });

        return tabs[key];
    }

    renderTab(key) {

        return this.getTab(key);
    }

    render() {

        let className = this.props.className ? this.props.className : '';

        return (
            <div className={ className }>
                <ul className="tabs-nav">
                    { Object.keys(this.props.children).map(this.renderNavItem.bind(this)) }
                </ul>
                <div className="tabs-content">
                    { Object.keys(this.props.children).map(this.renderTab.bind(this)) }
                </div>
            </div>
        );
    }
}

Tabs.propTypes  = {
    className: React.PropTypes.string
}

class Tab extends React.Component {

    render() {

        let active = this.props.active ? 'active' : '';
        let className = this.props.className ? this.props.className : '';
        let id = this.props.id ? this.props.id : '';

        return (
            <div className={ `tab-panel ${className} ${active}`.trim() } id={ id }>
                { this.props.children }
            </div>
        );
    }
}

Tab.propTypes  = {
    id: React.PropTypes.string,
    title: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    active: React.PropTypes.bool
}

Tab.defaultProps = { 
    active: false
};

export default {
    Tabs,
    Tab
};
