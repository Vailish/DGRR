import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css';
<<<<<<< HEAD
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import RootReducer from './store/RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(RootReducer,  composeWithDevTools());
=======
import reportWebVitals from './reportWebVitals'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from 'react-router-dom'
>>>>>>> 67b4afc110318d75f89474409c034aa496564300

const store = createStore(rootReducer, composeWithDevTools())
ReactDOM.render(
<<<<<<< HEAD
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

=======
  // <Provider store={store}>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
reportWebVitals()
>>>>>>> 67b4afc110318d75f89474409c034aa496564300
