import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Navigation } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import NotFound from './components/NotFound';
import App from './components/App';


/*
    Routes
 */
var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
