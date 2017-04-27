import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store.js';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    const Modal = require('react-modal');
    let store = configureStore();
    Modal.setAppElement(document.body);
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store}/>, root);
});
