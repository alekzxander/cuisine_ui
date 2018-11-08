import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/app'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
// import logger from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk))
)
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
