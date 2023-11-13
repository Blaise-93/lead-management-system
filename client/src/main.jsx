import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './modal'
import '../src/App.css'
import '../src/index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/js/dist/popover.js';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap/js/dist/carousel';

ReactDOM.createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode><App/></React.StrictMode>
        )

